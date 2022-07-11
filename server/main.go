package main

import(
	routes "github.com/abdullah1308/GoStore-Backend/routes"
	"os"
	"log"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
)

func main(){
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")

	if port==""{
		port="8000"
	}

	router := gin.New()

	// Configuring CORS
	config := cors.DefaultConfig()
	// config.ExposeHeaders = append(config.ExposeHeaders, "Set-Cookie")
	// config.AllowHeaders = append(config.AllowHeaders, "Accept","Accept-Language","Content-Language","Authorization","Cookie","X-Requested-With","Host", "Set-Cookie")
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowHeaders = append(config.AllowHeaders, "Authorization")
  	// config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	// config.AllowAllOrigins = true "http://localhost:3000", 
	config.AllowCredentials = true
  	router.Use(cors.New(config))

	router.Use(gin.Logger(), gin.Recovery())

	routes.AuthRoutes(router)
	routes.UserRoutes(router)
	routes.AdRoutes(router)

	// router.GET("/api-1", func(c *gin.Context){
	// 	c.JSON(200, gin.H{"success":"Access granted for api-1"})
	// })

	// router.GET("/api-2", func(c *gin.Context){
	// 	c.JSON(200, gin.H{"success":"Access granted for api-2"})
	// })

	router.Run(":" + port)
}