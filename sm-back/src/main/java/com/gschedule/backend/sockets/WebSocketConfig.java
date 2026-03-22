package com.gschedule.backend.sockets;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // Habilita el manejo de mensajes de WebSocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 1. Los mensajes que el servidor ENVÍA empiezan por /topic
        config.enableSimpleBroker("/topic");
        // 2. Los mensajes que el servidor RECIBE (si enviaras datos por WS) empiezan por /app
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // El punto de entrada para la conexión desde Angular
        registry.addEndpoint("/ws-gschedule")
                .setAllowedOrigins("http://localhost:4200")
                .withSockJS(); 
    }
}