import config from "../config"

export const VajeCommand = register("command", () => {
    return config.openGUI()
}).setName("vaje")