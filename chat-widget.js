const ArintarkChat = {
  init(config) {
    // Default configuration
    const defaultConfig = {
      clientId: "demo",
      apiHost: window.location.origin,
      theme: {
        button: {
          text: "Chat with Us",
          backgroundColor: "#111827",
          borderRadius: "8px",
          right: 20,
          bottom: 20,
          size: 48,
        },
        chatWindow: {
          title: "Support Chat",
          welcomeMessage: "Hello! How can we help you today?",
          backgroundColor: "#ffffff",
          height: 600,
          width: 350,
          botMessage: {
            backgroundColor: "#f7f8ff",
            textColor: "#303235",
            avatarSrc: "http://localhost:3001/assistant.svg", // Default bot avatar
            showAvatar: true, // Toggle to show/hide avatar
          },
          userMessage: {
            backgroundColor: "#111827",
            textColor: "#ffffff",
            avatarSrc: "http://localhost:3001/user.svg", // Default user avatar
            showAvatar: true, // Toggle to show/hide avatar
          },
          textInput: {
            placeholder: "Type your message...",
            backgroundColor: "#ffffff",
            textColor: "#303235",
          },
        },
        footer: {
          text: "Powered by",
          company: "Arintark",
          companyLink: "https://arintark.com",
          rightLinkText: "Book a Free Consultation",
          rightLinkUrl: "https://arintark.com/consultation",
        },
      },
    }

    // Merge provided config with defaults
    const mergedConfig = this._mergeConfig(defaultConfig, config)

    // Create container for the chat widget
    const container = document.createElement("div")
    container.id = "arintark-chat-widget-" + mergedConfig.clientId
    document.body.appendChild(container)

    // Set up configuration for the widget script
    window.CHAT_CONFIG = {
      clientId: mergedConfig.clientId,
      buttonText: mergedConfig.theme.button.text,
      buttonColor: mergedConfig.theme.button.backgroundColor,
      buttonRadius: mergedConfig.theme.button.borderRadius,
      headerText: mergedConfig.theme.chatWindow.title,
      welcomeMessage: mergedConfig.theme.chatWindow.welcomeMessage,
      rightLinkText: mergedConfig.theme.footer.rightLinkText,
      rightLinkUrl: mergedConfig.theme.footer.rightLinkUrl,
      apiBaseUrl: mergedConfig.apiHost,
      // Pass avatar configuration explicitly
      userAvatar: mergedConfig.theme.chatWindow.userMessage.avatarSrc,
      botAvatar: mergedConfig.theme.chatWindow.botMessage.avatarSrc,
      showAvatars:
        mergedConfig.theme.chatWindow.userMessage.showAvatar && mergedConfig.theme.chatWindow.botMessage.showAvatar,
    }

    // Debug the configuration being passed to the widget
    console.log("Chat widget configuration:", {
      clientId: window.CHAT_CONFIG.clientId,
      userAvatar: window.CHAT_CONFIG.userAvatar,
      botAvatar: window.CHAT_CONFIG.botAvatar,
      showAvatars: window.CHAT_CONFIG.showAvatars,
    })

    // Load the actual chat widget script
    const widgetScript = document.createElement("script")
    widgetScript.src = mergedConfig.apiHost + "/api/chat-script?clientId=" + mergedConfig.clientId
    widgetScript.async = true
    document.head.appendChild(widgetScript)
  },

  _mergeConfig(target, source) {
    // Simple deep merge function
    const merged = { ...target }

    for (const key in source) {
      if (source[key] === null || source[key] === undefined) {
        continue
      }

      if (typeof source[key] === "object" && !Array.isArray(source[key])) {
        merged[key] = this._mergeConfig(merged[key] || {}, source[key])
      } else {
        merged[key] = source[key]
      }
    }

    return merged
  },
}

// Export for different module systems
if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    exports = module.exports = ArintarkChat
  }
  exports.ArintarkChat = ArintarkChat
} else {
  window.ArintarkChat = ArintarkChat
}

