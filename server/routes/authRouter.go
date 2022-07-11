package routes

import(
	controller "github.com/abdullah1308/GoStore-Backend/controllers"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(incomingRoutes *gin.Engine){
	incomingRoutes.POST("users/signup", controller.Signup())
	incomingRoutes.POST("users/login", controller.Login())
	incomingRoutes.GET("users/refresh", controller.Refresh())
	incomingRoutes.GET("users/logout", controller.Logout())
}