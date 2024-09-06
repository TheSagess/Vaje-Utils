import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color, @SelectorProperty } from '../Vigilance';

@Vigilant("VajeUtils", "§5VajeUtils",  {
    getCategoryComparator: () => (a, b) => {
        // Define the desired order of categories
        const categories = ['General', 'Blaze', 'Dungeons', 'F7/M7', 'Location Messages'];
        // Compare categories based on their index in the array
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings {

    p3StartTimerGui = new Gui()
    goldorTickTimerGui = new Gui()
    dungeonWarpCooldownGui = new Gui()
    campSplitsGui = new Gui()
    reaperDisplayGui = new Gui()
    relicSpawnTimerGui = new Gui()
    dragonSpawnTimerGui = new Gui()
    crystalSpawnTimerGui = new Gui()

    /*
    GENERAL
    */



    @SwitchProperty({
        name: "Cooldown Kick Message",
        description: "Sends a message to the party when you are cooldown kicked",
        category: "General",
        subcategory: "Cooldown Kick Message"
    })
    cdKick = false;

    @TextProperty({
        name: "Cooldown Kick Text",
        description: "Text used for Cooldown Kick Message",
        category: "General",
        subcategory: "Cooldown Kick Message",
        placeholder: "Cooldown Kicked!"
    })
    cdKickText = "Cooldown Kicked!";

    @SwitchProperty({
        name: "Reaper Display",
        description: "Shows time left on reaper armor ability",
        category: "General",
        subcategory: "Reaper Display"
    })
    reaperDisplay = false;

    @ButtonProperty({
        name: "Move Reaper Display",
        description: "Scroll to change scale, middle click to reset",
        category: "General",
        subcategory: "Reaper Display",
        placeholder: "Move"
    })
    MoveReaperDisplayGui() {
        this.reaperDisplayGui.open()
    };

    /*
    DUNGEONS
    */

    // general

    @SwitchProperty({
        name: "Dungeon Warp Cooldown",
        description: "Shows time before you can go into the next dungeon",
        category: "Dungeons",
        subcategory: "Dungeon Warp Cooldown"
    })
    dungeonWarpCooldown = false;

    @ButtonProperty({
        name: "Move Dungeon Warp Cooldown",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Dungeon Warp Cooldown",
        placeholder: "Move"
    })
    MoveDungeonWarpCooldownGui() {
        this.dungeonWarpCooldownGui.open()
    };

    @SwitchProperty({
        name: "Blood Rush Splits",
        description: "Tells you how long it took to clear each room on blood rush if you are archer or mage",
        category: "Dungeons",
        subcategory: "General"
    })
    bloodRushSplits = false

    @SwitchProperty({
        name: "Explo Shot Message",
        description: "Shows explosive shot damage per enemy",
        category: "Dungeons",
        subcategory: "General"
    })
    exploShot = false;

    @SwitchProperty({
        name: "Auto Open Potion Bag",
        description: "Opens the potion bag when entering a dungeon",
        category: "Dungeons",
        subcategory: "General"
    })
    autoOpenPotionBag = false;
    
    @SwitchProperty({
        name: "Duplicate Class Warning",
        description: "Shows a title and plays a sound if there is a duplicate class",
        category: "Dungeons",
        subcategory: "General"
    })
    dupeClass = false

    @TextProperty({
        name: "Duplicate Class Warning Sound",
        description: "Sound used for Duplicate Class Warning",
        category: "Dungeons",
        subcategory: "General",
        placeholder: "note.pling"
    })
    dupeClassSound = "note.pling"

    @SwitchProperty({
        name: "Blood Camp Helper",
        description: "Shows watcher move time and time to kill remaining blood mobs \nShows alert when watcher dialogue appears and if Diamante Giant is detected \nFixes SBE Blood Opened split when blood is entered before the door is opened",
        category: "Dungeons",
        subcategory: "General"
    })
    bloodCampHelper = false

    @SwitchProperty({
        name: "Show Blood Camp Splits On Screen",
        description: "Shows watcher move timer and remaining mobs killed timer as you are blood camping",
        category: "Dungeons",
        subcategory: "General"
    })
    campSplits = false

    @SwitchProperty({
        name: "Hide Splits in Boss",
        description: "Hides the blood camp splits when you enter boss",
        category: "Dungeons",
        subcategory: "General"
    })
    hideCampSplitsInBoss = false
    @SwitchProperty({
        name: "Secret wayponts [scuffed like BM but works]",
        description: "Shows a green box around secrects in the room your currently in",
        category: "Dungeons",
        subcategory: "General"
    })
    secrectwaypoint = false


    @ButtonProperty({
        name: "Move Blood Camp Splits",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "General",
        placeholder: "Move"
    })
    MoveCampSplitsGui() {
        this.campSplitsGui.open()
    };

    // invincibility

    @SwitchProperty({
        name: "Bonzo and Phoenix Messages",
        description: "Announces when bonzo mask procs",
        category: "Dungeons",
        subcategory: "Invincibility"
    })
    maskPhoenixMsg = false;

    @TextProperty({
        name: "Bonzo Mask Text",
        description: "Text used for Bonzo Mask Message",
        category: "Dungeons",
        subcategory: "Invincibility",
        placeholder: "Bonzo's Mask Procced!"
    })
    maskText = "Bonzo's Mask Procced!";

    @TextProperty({
        name: "Phoenix Text",
        description: "Text used for Phoenix Message",
        category: "Dungeons",
        subcategory: "Invincibility",
        placeholder: "Phoenix Procced!"
    })
    phoenixText = "Phoenix Procced!"

    @SwitchProperty({
        name: "Disable During Pre 4",
        description: "Does not send the bonzo and phoenix messages if you are doing pre 4 as berserker",
        category: "Dungeons",
        subcategory: "Invincibility"
    })
    pre4Disable = false

    // party finder

    @SwitchProperty({
        name: "Show MP",
        description: "Shows a player's magical power when joining a party",
        category: "Dungeons",
        subcategory: "Party Finder"
    })
    showMP = false;

    @SwitchProperty({
        name: "Show PB",
        description: "Shows a player's M7 PB when joining a party",
        category: "Dungeons",
        subcategory: "Party Finder"
    })
    showPB = false;

    @SwitchProperty({
        name: "Show level",
        description: "Shows a player's skyblock level when joining a party",
        category: "Dungeons",
        subcategory: "Party Finder"
    })
    showLVL = false;

    /*
    F7/M7
    */

    // general

    @SwitchProperty({
        name: "Predev Timer",
        description: "Tells you how long it took to complete predev",
        category: "F7/M7",
        subcategory: "General"
    })
    predevTimer = false;

    @SwitchProperty({
        name: "Dragon Spawn Timer",
        description: "Dragon spawn timer that syncs with server lag",
        category: "F7/M7",
        subcategory: "General"
    })
    dragonSpawnTimer = false;
    
    @ButtonProperty({
        name: "Move Dragon Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "General",
        placeholder: "Move"
    })
    MoveDragonSpawnTimerGui() {
        this.dragonSpawnTimerGui.open()
    };

    @SelectorProperty({
        name: "Healer Debuff Team",
        description: "Changes whether dragon spawn timer shows arch or bers dragon if you are healer",
        category: "F7/M7",
        subcategory: "General",
        options: [
            "Arch Team",
            "Bers Team"
        ]
    })
    healerTeam = 0;

    @SwitchProperty({
        name: "Crystal Spawn Timer",
        description: "Shows when the second set of crystals will spawn",
        category: "F7/M7",
        subcategory: "General"
    })
    crystalSpawnTimer = false;

    @ButtonProperty({
        name: "Move Crystal Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "General",
        placeholder: "Move"
    })
    MoveCrystalSpawnTimerGui() {
        this.crystalSpawnTimerGui.open()
    };

    @SwitchProperty({
        name: "Crystal Place Timer",
        description: "Times how long it took to place the crystal after picking it up",
        category: "F7/M7",
        subcategory: "General"
    })
    crystalPlaceTimer = false

    // phase 3

    @SwitchProperty({
        name: "P3 Start Timer",
        description: "Shows time until P3 starts from when Storm dies",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    p3StartTimer = false;

    @ButtonProperty({
        name: "Move P3 Start Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "Phase 3",
        placeholder: "Move"
    })
    MoveP3StartTimerGui() {
        this.p3StartTimerGui.open()
    };

    @SwitchProperty({
        name: "Terminal Timestamps",
        description: "Shows what time each terminal, device, or lever was completed",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    terminalTimestamps = false;

    @SwitchProperty({
        name: "Goldor Tick Timer",
        description: "Shows a timer for Goldor death ticks",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    goldorTickTimer = false;

    @ButtonProperty({
        name: "Move Goldor Tick Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "Phase 3",
        placeholder: "Move"
    })
    MoveGoldorTickTimerGui() {
        this.goldorTickTimerGui.open()
    };

    @SwitchProperty({
        name: "Hide Players In P3",
        description: "Hides players during the terminals phase",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    hidePlayersInP3 = false;

    @SwitchProperty({
        name: "Only Hide Players After Leaping",
        description: "Hides players during the terminals phase only after leaping",
        category: "F7/M7",
        subcategory: "Phase 3"
    })
    onlyAfterLeaping = false;

    // relics

    @SwitchProperty({
        name: "Relic Spawn Timer",
        description: "Shows time until relics spawn, NOT accurate with server lag",
        category: "F7/M7",
        subcategory: "Relics"
    })
    relicSpawnTimer = false;

    @TextProperty({
        name: "Relic Spawn Timer Amount",
        description: "Since relic spawn is so rng, choose your own time... \nDefault is 42",
        category: "F7/M7",
        subcategory: "Relics",
        placeholder: "42"
    })
    relicSpawnTimerAmt = "42"

    @ButtonProperty({
        name: "Move Relic Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "F7/M7",
        subcategory: "Relics",
        placeholder: "Move"
    })
    MoveRelicSpawnTimerGui() {
        this.relicSpawnTimerGui.open()
    };

    @SwitchProperty({
        name: "Relic Timer",
        description: "Shows time it took to place your relic",
        category: "F7/M7",
        subcategory: "Relics"
    })
    relicTimer = false;

    @SwitchProperty({
        name: "Show Relic Pick Up Time",
        description: "Calculates how long it took to pick up the relic after it spawned",
        category: "F7/M7",
        subcategory: "Relics"
    })
    relicPickupTime = false;

    @SwitchProperty({
        name: "Show Every Relic",
        description: "Shows relic time for all five relics (might clog chat)",
        category: "F7/M7",
        subcategory: "Relics"
    })
    showEveryRelic = false

    // location messages

    @SwitchProperty({
        name: "Location Notifications",
        description: "Shows a title and plays a sound when a party member sends a location message",
        category: "Location Messages",
        subcategory: "General"
    })
    locationNotif = false;

    @TextProperty({
        name: "Location Notification Sound",
        description: "Sound used for Location Notification Sound",
        category: "Location Messages",
        subcategory: "General",
        placeholder: "note.harp"
    })
    locationSound = "note.harp";

    @SwitchProperty({
        name: "SS Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    ssCoord = false;

    @SwitchProperty({
        name: "Pre Enter 2 Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    pre2Coord = false;

    @SwitchProperty({
        name: "Insta 3 Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    i3Coord = false;

    @SwitchProperty({
        name: "Pre Enter 3 Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    pre3Coord = false;
    
    @SwitchProperty({
        name: "At Core Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    slingshotCoord = false;

    @SwitchProperty({
        name: "Inside Tunnel Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    tunnelCoord = false;
    @SwitchProperty({
        name: "Blaze 1 tap Helper",
        category: "Blaze",
        subcategory: "1 tap"
    })
    blaze1tap = false;

    constructor() {
        this.initialize(this);
        
        const lines = [
            "",
            "&5Welcome to Vaje Utils!",
            "",
            "&fCommands:",
            "&7/mp &d[name]&7 - shows &d[name]&7's magical power.",
            "&7/fiyrequote &d[number] - shows a fiyr quote",
            "&7/pb &d[name]&7 - shows &d[name]&7's m7 pb.",
            "&7/level &d[name]&7 - shows &d[name]&7's skyblock level.",
            "&7/remind &d[msg]&7 - sets a reminder that shows &d[msg]&7 on your screen at the end of a dungeon or kuudra run",
            "&7/clearremind - clears any set reminders",
            "&7/ep - fills your stack of ender pearls",
            "&7/ij - fills your stack of inflatable jerries",
            "&7/refill - refills both ender pearls and inflatable jerries",
            "&7/coinflip &d[name]&7 - flips a coin to kick &d[name]&7 from the party",
            "&7/coinflip &d[name1]&7 &d[name2]&7 - flips a coin to kick either &d[name1]&7 or &d[name2]&7 from the party.",
            "&7/rotate &d[pitch] [yaw]&7 - rotates you to specified pitch and yaw",
            "",
            "&4NOTE: A LOT of the features do not work without Mort and Boss messages. Make sure to not have them disabled.",
            ""
        ]
        const commands = lines.join("\n")

        this.setCategoryDescription("General", commands)

        this.addDependency("Cooldown Kick Text", "Cooldown Kick Message")
        this.addDependency("Move Reaper Display", "Reaper Display")
        this.addDependency("Move Dungeon Warp Cooldown", "Dungeon Warp Cooldown")
        this.addDependency("Duplicate Class Warning Sound", "Duplicate Class Warning")
        this.addDependency("Show Blood Camp Splits On Screen", "Blood Camp Helper")
        this.addDependency("Hide Splits in Boss", "Blood Camp Helper")
        this.addDependency("Move Blood Camp Splits", "Blood Camp Helper")
        this.addDependency("Move P3 Start Timer", "P3 Start Timer")
        this.addDependency("Bonzo Mask Text", "Bonzo and Phoenix Messages")
        this.addDependency("Phoenix Text", "Bonzo and Phoenix Messages")
        this.addDependency("Disable During Pre 4", "Bonzo and Phoenix Messages")
        this.addDependency("Move Dragon Spawn Timer", "Dragon Spawn Timer")
        this.addDependency("Healer Debuff Team", "Dragon Spawn Timer")
        this.addDependency("Move Crystal Spawn Timer", "Crystal Spawn Timer")
        this.addDependency("Move P3 Start Timer", "P3 Start Timer")
        this.addDependency("Move Goldor Tick Timer", "Goldor Tick Timer")
        this.addDependency("Only Hide Players After Leaping", "Hide Players In P3")
        this.addDependency("Relic Spawn Timer Amount", "Relic Spawn Timer")
        this.addDependency("Move Relic Spawn Timer", "Relic Spawn Timer")
        this.addDependency("Show Relic Pick Up Time", "Relic Timer")
        this.addDependency("Location Notification Sound", "Location Notifications")
    }
}

export default new Settings()