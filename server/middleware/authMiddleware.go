package middleware

import (
	"net/http"
	"fmt"
	"github.com/abdullah1308/GoStore-Backend/helpers"
	"github.com/gin-gonic/gin"
)

func Authenticate() gin.HandlerFunc{
	return func(c *gin.Context){
		const BEARER_SCHEMA = "Bearer "
		authHeader := c.GetHeader("Authorization")
		tokenString := authHeader[len(BEARER_SCHEMA):]
		if tokenString == ""{
			c.JSON(http.StatusInternalServerError, gin.H{"error":fmt.Sprintf("No Authorization header provided")})
			c.Abort()
			return
		}

		claims, err := helpers.ValidateToken(tokenString, false)

		if err != ""{
			c.JSON(http.StatusUnauthorized, gin.H{"error":err})
			c.Abort()
			return
		}

		c.Set("email", claims.Email)
		c.Set("first_name", claims.First_name)
		c.Set("last_name", claims.Last_name)
		c.Set("uid",claims.Uid)
		c.Next()

	}
}