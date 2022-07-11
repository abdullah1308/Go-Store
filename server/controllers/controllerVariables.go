package controllers

import (
	"os"

	"github.com/abdullah1308/GoStore-Backend/database"
	"github.com/cloudinary/cloudinary-go"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "users")
var adCollection *mongo.Collection = database.OpenCollection(database.Client, "ads")
var validate = validator.New()
var cld, _ = cloudinary.NewFromParams(os.Getenv("CLOUDINARY_CLOUD_NAME"), os.Getenv("CLOUDINARY_API_KEY"), os.Getenv("CLOUDINARY_API_SECRET"))