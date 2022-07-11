package routes

import(
	// controller "github.com/abdullah1308/GoStore-Backend/controllers"
	"github.com/abdullah1308/GoStore-Backend/middleware"
	"github.com/gin-gonic/gin"
)

func UserRoutes(incomingRoutes *gin.Engine){
	incomingRoutes.Use(middleware.Authenticate())
	incomingRoutes.GET("/api-1", func(c *gin.Context){
		c.JSON(200, gin.H{"success":"Access granted for api-1"})
	})
	incomingRoutes.GET("/api-2", func(c *gin.Context){
		c.JSON(200, gin.H{"success":"Access granted for api-2"})
	})
	
	// router.GET("/api-1", func(c *gin.Context){
	// 	c.JSON(200, gin.H{"success":"Access granted for api-1"})
	// })

	// router.GET("/api-2", func(c *gin.Context){
	// 	c.JSON(200, gin.H{"success":"Access granted for api-2"})
	// })
}