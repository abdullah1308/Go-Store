package controllers

import (
	"context"
	"net/http"
	"reflect"
	"strconv"
	"time"

	"github.com/abdullah1308/GoStore-Backend/models"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateAd() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ad models.Ad

		if err := c.BindJSON(&ad); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		validationErr := validate.Struct(ad)
		if validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
			return
		}

		ad.Created_at = time.Now().Format("Monday, January 2, 2006")
		ad.Updated_at = time.Now().Format("Monday, January 2, 2006")
		ad.ID = primitive.NewObjectID()
		ad.Ad_id = ad.ID.Hex()

		adReflect := reflect.ValueOf(&ad)
		// fmt.Printf("%+v\n", ad)

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		for i := 10; i <= 17; i++ {
			imgURI := adReflect.Elem().Field(i).Elem().String()
			// fmt.Println(imgURI)
			if imgURI != "<invalid Value>" && imgURI != "" {
				pID := "GoStore/" + ad.Ad_id + "-" + strconv.Itoa(i - 10 + 1)
				_, err := cld.Upload.Upload(ctx, imgURI, uploader.UploadParams{PublicID: pID, Folder: "GoStore"})
				if err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					return
				}
				
				adReflect.Elem().Field(i).Elem().SetString(pID)
			}
		}

		resultInsertionNumber, insertErr := adCollection.InsertOne(ctx, ad)
		if(insertErr != nil) {
			msg := "Ad was not created"
			c.JSON(http.StatusInternalServerError, gin.H{"error":msg})
			return
		}
		c.JSON(http.StatusOK, resultInsertionNumber)
	}
}

func EditAd() gin.HandlerFunc {
	return func(c *gin.Context) {
		
	}
}

func DeleteAd() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}