package helpers

import (
	"log"
	"os"
	"time"
	jwt "github.com/dgrijalva/jwt-go"
	// "go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/options"
)

type SignedDetails struct{
	Email 		string
	First_name 	string
	Last_name 	string
	Uid 		string
	jwt.StandardClaims 
}

var ACCESS_TOKEN_SECRET string = os.Getenv("ACCESS_TOKEN_SECRET")
var REFRESH_TOKEN_SECRET string = os.Getenv("REFRESH_TOKEN_SECRET")

func GenerateAllTokens(email string, firstName string, lastName string, uid string) (signedToken string, signedRefreshToken string, err error){
	accessClaims := &SignedDetails{
		Email : email,
		First_name: firstName,
		Last_name: lastName,
		Uid : uid,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 15).Unix(),
			// ExpiresAt: time.Now().Add(time.Minute * 1).Unix(),
		},
	}

	refreshClaims := &SignedDetails{
		Email : email,
		First_name: firstName,
		Last_name: lastName,
		Uid : uid,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims).SignedString([]byte(ACCESS_TOKEN_SECRET))
	
	if err != nil {
		log.Panic(err)
		return 
	}
	
	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(REFRESH_TOKEN_SECRET))

	if err != nil {
		log.Panic(err)
		return 
	}

	return token, refreshToken, err
}

func ValidateToken(signedToken string, isRefresh bool) (claims *SignedDetails, msg string){
	var tokenSecret string
	if(isRefresh) {
		tokenSecret = REFRESH_TOKEN_SECRET
	} else {
		tokenSecret = ACCESS_TOKEN_SECRET
	}
	
	token, err := jwt.ParseWithClaims(
		signedToken,
		&SignedDetails{},
		func(token *jwt.Token)(interface{}, error){
			return []byte(tokenSecret), nil
		},
	)

	if err != nil {
		msg=err.Error()
		return
	}

	claims, ok:= token.Claims.(*SignedDetails)
	if !ok{
		msg = "the token is invalid"
		// msg = err.Error()
		return
	}


	if claims.ExpiresAt < time.Now().Unix(){
		msg = "token is expired"
		// msg = err.Error()
		return
	}

	// if !token.Valid{
	// 	msg = token.Claims.Valid().Error()
	// 	return
	// }

	return claims, msg
}