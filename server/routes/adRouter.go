package routes

import(
	controller "github.com/abdullah1308/GoStore-Backend/controllers"
	"github.com/abdullah1308/GoStore-Backend/middleware"
	"github.com/gin-gonic/gin"
)

func AdRoutes(incomingRoutes *gin.Engine){
	incomingRoutes.POST("ads/create", middleware.Authenticate(), controller.CreateAd())
}