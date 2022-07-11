package models

import 	(
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Ad struct {
	ID          	primitive.ObjectID 		`bson:"_id"`
	Name        	*string            		`json:"name" validate:"required,min=3,max=45"`
	Price       	*float64           		`json:"price" validate:"required,min=0"`
	Currency    	*string            		`json:"currency" validate:"required,min=3,max=3"`
	Category    	*string            		`json:"category" validate:"required"`
	Sub_category    *string            		`json:"sub_category" validate:"required"`
	Description 	*string            		`json:"description"`
	Contact_num  	*string     			`json:"contact_num"`
	City        	*string            		`json:"city" validate:"required"`
	Country     	*string            		`json:"country" validate:"required"`
	Image1      	*string 				`json:"img1"`
	Image2      	*string 				`json:"img2"`
	Image3      	*string 				`json:"img3"`
	Image4      	*string 				`json:"img4"`
	Image5      	*string 				`json:"img5"`
	Image6      	*string 				`json:"img6"`
	Image7      	*string 				`json:"img7"`
	Image8      	*string 				`json:"img8"`
	Created_at		string					`json:"created_at"`
	Updated_at		string					`json:"updated_at"`
	Ad_id			string					`json:"ad_id"`
	User_id	 		string					`json:"user_id" validate:"required"`
}