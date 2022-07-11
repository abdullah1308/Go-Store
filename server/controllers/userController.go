package controllers

import (
	"context"
	"log"
	"net/http"
	// "net/url"
	"time"

	// "github.com/abdullah1308/GoStore-Backend/database"
	"github.com/abdullah1308/GoStore-Backend/helpers"
	"github.com/abdullah1308/GoStore-Backend/models"
	"github.com/gin-gonic/gin"
	// "github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

// var userCollection *mongo.Collection = database.OpenCollection(database.Client, "users")
// var validate = validator.New()

func HashPassword(password string) string{
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err!=nil{
		log.Panic(err)
	}
	return string(bytes)
}

func VerifyPassword(userPassword string, providedPassword string)(bool, string){
	err := bcrypt.CompareHashAndPassword([]byte(providedPassword), []byte(userPassword))
	check := true
	msg := ""

	if err!= nil {
		msg = "Email or password is incorrect"
		check=false
	}
	return check, msg
}

func Signup() gin.HandlerFunc{

	return func(c *gin.Context){
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		validationErr := validate.Struct(user)
		if validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error":validationErr.Error()})
			return
		}

		count, err := userCollection.CountDocuments(ctx, bson.M{"email":user.Email})
		defer cancel()
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error":"Error occurred while checking for the email"})
			return
		}

		if count >0 {
			c.JSON(http.StatusConflict, gin.H{"error":"This email already exists"})
			return
		}

		password := HashPassword(*user.Password)
		user.Password = &password

		user.Created_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.ID = primitive.NewObjectID()
		user.User_id = user.ID.Hex()
		// token, refreshToken, _ := helper.GenerateAllTokens(*user.Email, *user.First_name, *user.Last_name, *user.User_type, *&user.User_id)
		// user.Token = &token
		// user.Refresh_token = &refreshToken

		resultInsertionNumber, insertErr := userCollection.InsertOne(ctx, user)
		if insertErr !=nil {
			msg := "User ID was not created"
			c.JSON(http.StatusInternalServerError, gin.H{"error":msg})
			return
		}
		defer cancel()
		c.JSON(http.StatusOK, resultInsertionNumber)
	}

}

func Login() gin.HandlerFunc{
	return func(c *gin.Context){
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user models.User
		var foundUser models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
			return 
		}

		err := userCollection.FindOne(ctx, bson.M{"email":user.Email}).Decode(&foundUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error":"Email or password is incorrect"})
			return
		}

		passwordIsValid, msg := VerifyPassword(*user.Password, *foundUser.Password)
		// defer cancel()
		if !passwordIsValid{
			c.JSON(http.StatusUnauthorized, gin.H{"error": msg})
			return
		}

		if foundUser.Email == nil{
			c.JSON(http.StatusUnauthorized, gin.H{"error":"Email or password is incorrect"})
			return
		}

		accessToken, refreshToken, _ := helpers.GenerateAllTokens(*foundUser.Email, *foundUser.First_name, *foundUser.Last_name, foundUser.User_id)
		
		userResponse := models.User{
			Email: foundUser.Email,
			First_name: foundUser.First_name,
			Last_name: foundUser.Last_name,
			User_id: foundUser.User_id,
		}
		
		response := struct {
			User models.User `json:"user"`
			Token string `json:"token"`
		} {
			User: userResponse,
			Token: accessToken,
		}
		
		// c.SetSameSite(http.SameSiteNoneMode)
		c.SetCookie("refresh_token", refreshToken, 86400, "/", "localhost", false, true)
		// http.SetCookie(c.Writer, &http.Cookie{
		// 	Name:     "refresh_token",
		// 	Value:    url.QueryEscape(refreshToken),
		// 	SameSite: http.SameSiteNoneMode,
		// 	Secure:   false,
		// 	HttpOnly: true,
		// })
		
		c.JSON(http.StatusOK, response)
	}
}

func Refresh() gin.HandlerFunc{
	return func(c *gin.Context){
		refreshToken, err := c.Cookie("refresh_token");
		if err != nil {
			// fmt.Println("refreshToken: " + refreshToken);
			// fmt.Println("Err: " + err.Error());

			c.JSON(http.StatusUnauthorized, gin.H{"error":"refresh token not found"})
			return
		}

		claims, msg := helpers.ValidateToken(refreshToken, true)

		if msg != ""{
			c.JSON(http.StatusUnauthorized, gin.H{"error":msg})
			return
		}

		newAccessToken, _, err := helpers.GenerateAllTokens(claims.Email, claims.First_name, claims.Last_name, claims.Uid)
		
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}

		userResponse := models.User{
			Email: &claims.Email,
			First_name: &claims.First_name,
			Last_name: &claims.Last_name,
			User_id: claims.Uid,
		}

		response := struct {
			User models.User `json:"user"`
			Token string `json:"token"`
			ExpiresIn int `json:"expires_in"`
		} {
			User: userResponse,
			Token: newAccessToken,
			ExpiresIn: 15 * 60000,
		}


		c.JSON(http.StatusOK, response)
	}
}

// Removes the httpOnly refresh_token
func Logout() gin.HandlerFunc{
	return func(c *gin.Context){
		c.SetCookie("refresh_token", "", 0, "/", "localhost", false, true)
		c.JSON(http.StatusOK, gin.H{"message":"logged out"})
	}
}