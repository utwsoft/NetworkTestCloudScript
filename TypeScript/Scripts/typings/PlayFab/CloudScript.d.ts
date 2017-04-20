/** Static object you add your CloudScript endpoints to */
declare var handlers: any;
/** The playfab id for the user who called into CloudScript */
declare var currentPlayerId: string;

/**
 * Static object containing cloudscript logging functions
 * debug(message: string, exc?: any): void,
 * error(message: string, exc?: any): void,
 * info(message: string, exc?: any): void,
 */
declare var log: Logger;
interface Logger {
    debug(message: string, exc?: any): void,
    error(message: string, exc?: any): void,
    info(message: string, exc?: any): void,
}

/**
 * Static object containing cloudscript external request functions
 * request(url: string, method?: string, content?: string, contentType?: string): string
 */
declare var http: IPlayFabHttp;
interface IPlayFabHttp {
    request(url: string, method?: string, content?: string, contentType?: string, headers?: { [key: string]: string }): string
}

interface IPlayFabContext {
    playStreamEvent: PlayStreamModels.IBasePlayStreamEvent;
    playerProfile: IPlayFabPlayerProfile;
}

interface IPlayFabPlayerProfile {
    PlayerId: string;
    DisplayName: string;
}

declare var script: IPlayFabEnvironment;
interface IPlayFabEnvironment {
    revision: number;
    titleId: string;
}

/** Static object which allows access to PlayFab ServerAPI calls */
declare var server: IPlayFabServerAPI;

/** ServerAPI.Models as interfaces */

declare namespace PlayFabServerModels {
    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ActionsOnPlayersInSegmentTaskSummary */
    interface ActionsOnPlayersInSegmentTaskSummary {
        /** ID of the task instance. */
        TaskInstanceId?: string,
        /** Identifier of the task this instance belongs to. */
        TaskIdentifier?: NameIdentifier,
        /** UTC timestamp when the task started. */
        StartedAt: string,
        /** UTC timestamp when the task completed. */
        CompletedAt?: string,
        /** Current status of the task instance. */
        Status?: TaskInstanceStatus,
        /** Progress represented as percentage. */
        PercentComplete?: number,
        /** Estimated time remaining in seconds. */
        EstimatedSecondsRemaining?: number,
        /** If manually scheduled, ID of user who scheduled the task. */
        ScheduledByUserId?: string,
        /** Error message for last processing attempt, if an error occured. */
        ErrorMessage?: string,
        /** Flag indicating if the error was fatal, if false job will be retried. */
        ErrorWasFatal?: boolean,
        /** Total players in segment when task was started. */
        TotalPlayersInSegment?: number,
        /** Total number of players that have had the actions applied to. */
        TotalPlayersProcessed?: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AdCampaignAttribution */
    interface AdCampaignAttribution {
        /** Attribution network name */
        Platform?: string,
        /** Attribution campaign identifier */
        CampaignId?: string,
        /** UTC time stamp of attribution */
        AttributedAt: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AdCampaignAttributionModel */
    interface AdCampaignAttributionModel {
        /** Attribution network name */
        Platform?: string,
        /** Attribution campaign identifier */
        CampaignId?: string,
        /** UTC time stamp of attribution */
        AttributedAt: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AddCharacterVirtualCurrencyRequest */
    interface AddCharacterVirtualCurrencyRequest {
        /** 
         * PlayFab unique identifier of the user whose virtual currency balance is to be
         * incremented.
         */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Name of the virtual currency which is to be incremented. */
        VirtualCurrency: string,
        /** 
         * Amount to be added to the character balance of the specified virtual currency.
         * Maximum VC balance is Int32 (2,147,483,647). Any increase over this value will
         * be discarded.
         */
        Amount: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AddFriendRequest */
    interface AddFriendRequest {
        /** PlayFab identifier of the player to add a new friend. */
        PlayFabId: string,
        /** The PlayFab identifier of the user being added. */
        FriendPlayFabId?: string,
        /** The PlayFab username of the user being added */
        FriendUsername?: string,
        /** Email address of the user being added. */
        FriendEmail?: string,
        /** Title-specific display name of the user to being added. */
        FriendTitleDisplayName?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AddPlayerTagRequest */
    interface AddPlayerTagRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique tag for player profile. */
        TagName: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AddPlayerTagResult */
    interface AddPlayerTagResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AddSharedGroupMembersRequest */
    interface AddSharedGroupMembersRequest {
        /** Unique identifier for the shared group. */
        SharedGroupId: string,
        /** 
         * An array of unique PlayFab assigned ID of the user on whom the operation will
         * be performed.
         */
        PlayFabIds: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AddSharedGroupMembersResult */
    interface AddSharedGroupMembersResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AddUserVirtualCurrencyRequest */
    interface AddUserVirtualCurrencyRequest {
        /** 
         * PlayFab unique identifier of the user whose virtual currency balance is to be
         * increased.
         */
        PlayFabId: string,
        /** Name of the virtual currency which is to be incremented. */
        VirtualCurrency: string,
        /** 
         * Amount to be added to the user balance of the specified virtual currency.
         * Maximum VC balance is Int32 (2,147,483,647). Any increase over this value will
         * be discarded.
         */
        Amount: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AuthenticateSessionTicketRequest */
    interface AuthenticateSessionTicketRequest {
        /** Session ticket as issued by a PlayFab client login API. */
        SessionTicket: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AuthenticateSessionTicketResult */
    interface AuthenticateSessionTicketResult {
        /** Account info for the user whose session ticket was supplied. */
        UserInfo?: UserAccountInfo,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AwardSteamAchievementItem */
    interface AwardSteamAchievementItem {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique Steam achievement name. */
        AchievementName: string,
        /** Result of the award attempt (only valid on response, not on request). */
        Result: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AwardSteamAchievementRequest */
    interface AwardSteamAchievementRequest {
        /** Array of achievements to grant and the users to whom they are to be granted. */
        Achievements: AwardSteamAchievementItem[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.AwardSteamAchievementResult */
    interface AwardSteamAchievementResult {
        /** Array of achievements granted. */
        AchievementResults?: AwardSteamAchievementItem[],
    }

    /** 
     * Contains information for a ban.
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.BanInfo
     */
    interface BanInfo {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId?: string,
        /** The unique Ban Id associated with this ban. */
        BanId?: string,
        /** The IP address on which the ban was applied. May affect multiple players. */
        IPAddress?: string,
        /** The MAC address on which the ban was applied. May affect multiple players. */
        MACAddress?: string,
        /** The time when this ban was applied. */
        Created?: string,
        /** The time when this ban expires. Permanent bans do not have expiration date. */
        Expires?: string,
        /** The reason why this ban was applied. */
        Reason?: string,
        /** 
         * The active state of this ban. Expired bans may still have this value set to
         * true but they will have no effect.
         */
        Active: boolean,
    }

    /** 
     * Represents a single ban request.
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.BanRequest
     */
    interface BanRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** IP address to be banned. May affect multiple players. */
        IPAddress?: string,
        /** MAC address to be banned. May affect multiple players. */
        MACAddress?: string,
        /** The reason for this ban. Maximum 140 characters. */
        Reason?: string,
        /** The duration in hours for the ban. Leave this blank for a permanent ban. */
        DurationInHours?: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.BanUsersRequest */
    interface BanUsersRequest {
        /** List of ban requests to be applied. Maximum 100. */
        Bans: BanRequest[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.BanUsersResult */
    interface BanUsersResult {
        /** Information on the bans that were applied */
        BanData?: BanInfo[],
    }

    /** 
     * A purchasable item from the item catalog
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CatalogItem
     */
    interface CatalogItem {
        /** unique identifier for this item */
        ItemId: string,
        /** class to which the item belongs */
        ItemClass?: string,
        /** catalog version for this item */
        CatalogVersion?: string,
        /** text name for the item, to show in-game */
        DisplayName?: string,
        /** text description of item, to show in-game */
        Description?: string,
        /** 
         * price of this item in virtual currencies and "RM" (the base Real Money purchase
         * price, in USD pennies)
         */
        VirtualCurrencyPrices?: { [key: string]: number },
        /** override prices for this item for specific currencies */
        RealCurrencyPrices?: { [key: string]: number },
        /** list of item tags */
        Tags?: string[],
        /** game specific custom data */
        CustomData?: string,
        /** defines the consumable properties (number of uses, timeout) for the item */
        Consumable?: CatalogItemConsumableInfo,
        /** 
         * defines the container properties for the item - what items it contains,
         * including random drop tables and virtual currencies, and what item (if any) is
         * required to open it via the UnlockContainerItem API
         */
        Container?: CatalogItemContainerInfo,
        /** 
         * defines the bundle properties for the item - bundles are items which contain
         * other items, including random drop tables and virtual currencies
         */
        Bundle?: CatalogItemBundleInfo,
        /** 
         * if true, then an item instance of this type can be used to grant a character to
         * a user.
         */
        CanBecomeCharacter: boolean,
        /** 
         * if true, then only one item instance of this type will exist and its
         * remaininguses will be incremented instead. RemainingUses will cap out at
         * Int32.Max (2,147,483,647). All subsequent increases will be discarded
         */
        IsStackable: boolean,
        /** 
         * if true, then an item instance of this type can be traded between players using
         * the trading APIs
         */
        IsTradable: boolean,
        /** 
         * URL to the item image. For Facebook purchase to display the image on the item
         * purchase page, this must be set to an HTTP URL.
         */
        ItemImageUrl?: string,
        /** BETA: If true, then only a fixed number can ever be granted. */
        IsLimitedEdition: boolean,
        /** 
         * If the item has IsLImitedEdition set to true, and this is the first time this
         * ItemId has been defined as a limited edition item, this value determines the
         * total number of instances to allocate for the title. Once this limit has been
         * reached, no more instances of this ItemId can be created, and attempts to
         * purchase or grant it will return a Result of false for that ItemId. If the
         * item has already been defined to have a limited edition count, or if this
         * value is less than zero, it will be ignored.
         */
        InitialLimitedEditionCount: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CatalogItemBundleInfo */
    interface CatalogItemBundleInfo {
        /** 
         * unique ItemId values for all items which will be added to the player inventory
         * when the bundle is added
         */
        BundledItems?: string[],
        /** 
         * unique TableId values for all RandomResultTable objects which are part of the
         * bundle (random tables will be resolved and add the relevant items to the
         * player inventory when the bundle is added)
         */
        BundledResultTables?: string[],
        /** 
         * virtual currency types and balances which will be added to the player inventory
         * when the bundle is added
         */
        BundledVirtualCurrencies?: { [key: string]: number },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CatalogItemConsumableInfo */
    interface CatalogItemConsumableInfo {
        /** 
         * number of times this object can be used, after which it will be removed from
         * the player inventory
         */
        UsageCount?: number,
        /** 
         * duration in seconds for how long the item will remain in the player inventory -
         * once elapsed, the item will be removed (recommended minimum value is 5
         * seconds, as lower values can cause the item to expire before operations
         * depending on this item's details have completed)
         */
        UsagePeriod?: number,
        /** 
         * all inventory item instances in the player inventory sharing a non-null
         * UsagePeriodGroup have their UsagePeriod values added together, and share the
         * result - when that period has elapsed, all the items in the group will be
         * removed
         */
        UsagePeriodGroup?: string,
    }

    /** 
     * Containers are inventory items that can hold other items defined in the
     * catalog, as well as virtual currency, which is added to the player inventory
     * when the container is unlocked, using the UnlockContainerItem API. The items
     * can be anything defined in the catalog, as well as RandomResultTable objects
     * which will be resolved when the container is unlocked. Containers and their
     * keys should be defined as Consumable (having a limited number of uses) in
     * their catalog defintiions, unless the intent is for the player to be able to
     * re-use them infinitely.
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CatalogItemContainerInfo
     */
    interface CatalogItemContainerInfo {
        /** 
         * ItemId for the catalog item used to unlock the container, if any (if not
         * specified, a call to UnlockContainerItem will open the container, adding the
         * contents to the player inventory and currency balances)
         */
        KeyItemId?: string,
        /** 
         * unique ItemId values for all items which will be added to the player inventory,
         * once the container has been unlocked
         */
        ItemContents?: string[],
        /** 
         * unique TableId values for all RandomResultTable objects which are part of the
         * container (once unlocked, random tables will be resolved and add the relevant
         * items to the player inventory)
         */
        ResultTableContents?: string[],
        /** 
         * virtual currency types and balances which will be added to the player inventory
         * when the container is unlocked
         */
        VirtualCurrencyContents?: { [key: string]: number },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CharacterInventory */
    interface CharacterInventory {
        /** The id of this character. */
        CharacterId?: string,
        /** The inventory of this character. */
        Inventory?: ItemInstance[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CharacterLeaderboardEntry */
    interface CharacterLeaderboardEntry {
        /** PlayFab unique identifier of the user for this leaderboard entry. */
        PlayFabId?: string,
        /** 
         * PlayFab unique identifier of the character that belongs to the user for this
         * leaderboard entry.
         */
        CharacterId?: string,
        /** Title-specific display name of the character for this leaderboard entry. */
        CharacterName?: string,
        /** Title-specific display name of the user for this leaderboard entry. */
        DisplayName?: string,
        /** Name of the character class for this entry. */
        CharacterType?: string,
        /** Specific value of the user's statistic. */
        StatValue: number,
        /** User's overall position in the leaderboard. */
        Position: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CharacterResult */
    interface CharacterResult {
        /** The id for this character on this player. */
        CharacterId?: string,
        /** The name of this character. */
        CharacterName?: string,
        /** The type-string that was given to this character on creation. */
        CharacterType?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CloudScriptRevisionOption */
    type CloudScriptRevisionOption = "Live"
        | "Latest"
        | "Specific";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ConsumeItemRequest */
    interface ConsumeItemRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique instance identifier of the item to be consumed. */
        ItemInstanceId: string,
        /** Number of uses to consume from the item. */
        ConsumeCount: number,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ConsumeItemResult */
    interface ConsumeItemResult {
        /** Unique instance identifier of the item with uses consumed. */
        ItemInstanceId?: string,
        /** Number of uses remaining on the item. */
        RemainingUses: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ContinentCode */
    type ContinentCode = "AF"
        | "AN"
        | "AS"
        | "EU"
        | "NA"
        | "OC"
        | "SA";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CountryCode */
    type CountryCode = "AF"
        | "AX"
        | "AL"
        | "DZ"
        | "AS"
        | "AD"
        | "AO"
        | "AI"
        | "AQ"
        | "AG"
        | "AR"
        | "AM"
        | "AW"
        | "AU"
        | "AT"
        | "AZ"
        | "BS"
        | "BH"
        | "BD"
        | "BB"
        | "BY"
        | "BE"
        | "BZ"
        | "BJ"
        | "BM"
        | "BT"
        | "BO"
        | "BQ"
        | "BA"
        | "BW"
        | "BV"
        | "BR"
        | "IO"
        | "BN"
        | "BG"
        | "BF"
        | "BI"
        | "KH"
        | "CM"
        | "CA"
        | "CV"
        | "KY"
        | "CF"
        | "TD"
        | "CL"
        | "CN"
        | "CX"
        | "CC"
        | "CO"
        | "KM"
        | "CG"
        | "CD"
        | "CK"
        | "CR"
        | "CI"
        | "HR"
        | "CU"
        | "CW"
        | "CY"
        | "CZ"
        | "DK"
        | "DJ"
        | "DM"
        | "DO"
        | "EC"
        | "EG"
        | "SV"
        | "GQ"
        | "ER"
        | "EE"
        | "ET"
        | "FK"
        | "FO"
        | "FJ"
        | "FI"
        | "FR"
        | "GF"
        | "PF"
        | "TF"
        | "GA"
        | "GM"
        | "GE"
        | "DE"
        | "GH"
        | "GI"
        | "GR"
        | "GL"
        | "GD"
        | "GP"
        | "GU"
        | "GT"
        | "GG"
        | "GN"
        | "GW"
        | "GY"
        | "HT"
        | "HM"
        | "VA"
        | "HN"
        | "HK"
        | "HU"
        | "IS"
        | "IN"
        | "ID"
        | "IR"
        | "IQ"
        | "IE"
        | "IM"
        | "IL"
        | "IT"
        | "JM"
        | "JP"
        | "JE"
        | "JO"
        | "KZ"
        | "KE"
        | "KI"
        | "KP"
        | "KR"
        | "KW"
        | "KG"
        | "LA"
        | "LV"
        | "LB"
        | "LS"
        | "LR"
        | "LY"
        | "LI"
        | "LT"
        | "LU"
        | "MO"
        | "MK"
        | "MG"
        | "MW"
        | "MY"
        | "MV"
        | "ML"
        | "MT"
        | "MH"
        | "MQ"
        | "MR"
        | "MU"
        | "YT"
        | "MX"
        | "FM"
        | "MD"
        | "MC"
        | "MN"
        | "ME"
        | "MS"
        | "MA"
        | "MZ"
        | "MM"
        | "NA"
        | "NR"
        | "NP"
        | "NL"
        | "NC"
        | "NZ"
        | "NI"
        | "NE"
        | "NG"
        | "NU"
        | "NF"
        | "MP"
        | "NO"
        | "OM"
        | "PK"
        | "PW"
        | "PS"
        | "PA"
        | "PG"
        | "PY"
        | "PE"
        | "PH"
        | "PN"
        | "PL"
        | "PT"
        | "PR"
        | "QA"
        | "RE"
        | "RO"
        | "RU"
        | "RW"
        | "BL"
        | "SH"
        | "KN"
        | "LC"
        | "MF"
        | "PM"
        | "VC"
        | "WS"
        | "SM"
        | "ST"
        | "SA"
        | "SN"
        | "RS"
        | "SC"
        | "SL"
        | "SG"
        | "SX"
        | "SK"
        | "SI"
        | "SB"
        | "SO"
        | "ZA"
        | "GS"
        | "SS"
        | "ES"
        | "LK"
        | "SD"
        | "SR"
        | "SJ"
        | "SZ"
        | "SE"
        | "CH"
        | "SY"
        | "TW"
        | "TJ"
        | "TZ"
        | "TH"
        | "TL"
        | "TG"
        | "TK"
        | "TO"
        | "TT"
        | "TN"
        | "TR"
        | "TM"
        | "TC"
        | "TV"
        | "UG"
        | "UA"
        | "AE"
        | "GB"
        | "US"
        | "UM"
        | "UY"
        | "UZ"
        | "VU"
        | "VE"
        | "VN"
        | "VG"
        | "VI"
        | "WF"
        | "EH"
        | "YE"
        | "ZM"
        | "ZW";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CreateSharedGroupRequest */
    interface CreateSharedGroupRequest {
        /** 
         * Unique identifier for the shared group (a random identifier will be assigned,
         * if one is not specified).
         */
        SharedGroupId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.CreateSharedGroupResult */
    interface CreateSharedGroupResult {
        /** Unique identifier for the shared group. */
        SharedGroupId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.Currency */
    type Currency = "AED"
        | "AFN"
        | "ALL"
        | "AMD"
        | "ANG"
        | "AOA"
        | "ARS"
        | "AUD"
        | "AWG"
        | "AZN"
        | "BAM"
        | "BBD"
        | "BDT"
        | "BGN"
        | "BHD"
        | "BIF"
        | "BMD"
        | "BND"
        | "BOB"
        | "BRL"
        | "BSD"
        | "BTN"
        | "BWP"
        | "BYR"
        | "BZD"
        | "CAD"
        | "CDF"
        | "CHF"
        | "CLP"
        | "CNY"
        | "COP"
        | "CRC"
        | "CUC"
        | "CUP"
        | "CVE"
        | "CZK"
        | "DJF"
        | "DKK"
        | "DOP"
        | "DZD"
        | "EGP"
        | "ERN"
        | "ETB"
        | "EUR"
        | "FJD"
        | "FKP"
        | "GBP"
        | "GEL"
        | "GGP"
        | "GHS"
        | "GIP"
        | "GMD"
        | "GNF"
        | "GTQ"
        | "GYD"
        | "HKD"
        | "HNL"
        | "HRK"
        | "HTG"
        | "HUF"
        | "IDR"
        | "ILS"
        | "IMP"
        | "INR"
        | "IQD"
        | "IRR"
        | "ISK"
        | "JEP"
        | "JMD"
        | "JOD"
        | "JPY"
        | "KES"
        | "KGS"
        | "KHR"
        | "KMF"
        | "KPW"
        | "KRW"
        | "KWD"
        | "KYD"
        | "KZT"
        | "LAK"
        | "LBP"
        | "LKR"
        | "LRD"
        | "LSL"
        | "LYD"
        | "MAD"
        | "MDL"
        | "MGA"
        | "MKD"
        | "MMK"
        | "MNT"
        | "MOP"
        | "MRO"
        | "MUR"
        | "MVR"
        | "MWK"
        | "MXN"
        | "MYR"
        | "MZN"
        | "NAD"
        | "NGN"
        | "NIO"
        | "NOK"
        | "NPR"
        | "NZD"
        | "OMR"
        | "PAB"
        | "PEN"
        | "PGK"
        | "PHP"
        | "PKR"
        | "PLN"
        | "PYG"
        | "QAR"
        | "RON"
        | "RSD"
        | "RUB"
        | "RWF"
        | "SAR"
        | "SBD"
        | "SCR"
        | "SDG"
        | "SEK"
        | "SGD"
        | "SHP"
        | "SLL"
        | "SOS"
        | "SPL"
        | "SRD"
        | "STD"
        | "SVC"
        | "SYP"
        | "SZL"
        | "THB"
        | "TJS"
        | "TMT"
        | "TND"
        | "TOP"
        | "TRY"
        | "TTD"
        | "TVD"
        | "TWD"
        | "TZS"
        | "UAH"
        | "UGX"
        | "USD"
        | "UYU"
        | "UZS"
        | "VEF"
        | "VND"
        | "VUV"
        | "WST"
        | "XAF"
        | "XCD"
        | "XDR"
        | "XOF"
        | "XPF"
        | "YER"
        | "ZAR"
        | "ZMW"
        | "ZWD";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.DeleteCharacterFromUserRequest */
    interface DeleteCharacterFromUserRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** 
         * If true, the character's inventory will be transferred up to the owning user;
         * otherwise, this request will purge those items.
         */
        SaveCharacterInventory: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.DeleteCharacterFromUserResult */
    interface DeleteCharacterFromUserResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.DeleteSharedGroupRequest */
    interface DeleteSharedGroupRequest {
        /** Unique identifier for the shared group. */
        SharedGroupId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.DeleteUsersRequest */
    interface DeleteUsersRequest {
        /** 
         * An array of unique PlayFab assigned ID of the user on whom the operation will
         * be performed.
         */
        PlayFabIds: string[],
        /** 
         * Unique identifier for the title, found in the Settings > Game Properties
         * section of the PlayFab developer site when a title has been selected.
         */
        TitleId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.DeleteUsersResult */
    interface DeleteUsersResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.DeregisterGameRequest */
    interface DeregisterGameRequest {
        /** Unique identifier for the Game Server Instance that is being deregistered. */
        LobbyId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.DeregisterGameResponse */
    interface DeregisterGameResponse {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.EmptyResult */
    interface EmptyResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.EvaluateRandomResultTableRequest */
    interface EvaluateRandomResultTableRequest {
        /** The unique identifier of the Random Result Table to use. */
        TableId: string,
        /** 
         * Specifies the catalog version that should be used to evaluate the Random Result
         * Table.  If unspecified, uses default/primary catalog.
         */
        CatalogVersion?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.EvaluateRandomResultTableResult */
    interface EvaluateRandomResultTableResult {
        /** 
         * Unique identifier for the item returned from the Random Result Table
         * evaluation, for the given catalog.
         */
        ResultItemId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ExecuteCloudScriptResult */
    interface ExecuteCloudScriptResult {
        /** The name of the function that executed */
        FunctionName?: string,
        /** The revision of the CloudScript that executed */
        Revision: number,
        /** The object returned from the CloudScript function, if any */
        FunctionResult?: any,
        /** 
         * Entries logged during the function execution. These include both entries logged
         * in the function code using log.info() and log.error() and error entries for
         * API and HTTP request failures.
         */
        Logs?: LogStatement[],
        ExecutionTimeSeconds: number,
        /** 
         * Processor time consumed while executing the function. This does not include
         * time spent waiting on API calls or HTTP requests.
         */
        ProcessorTimeSeconds: number,
        MemoryConsumedBytes: number,
        /** Number of PlayFab API requests issued by the CloudScript function */
        APIRequestsIssued: number,
        /** Number of external HTTP requests issued by the CloudScript function */
        HttpRequestsIssued: number,
        /** Information about the error, if any, that occured during execution */
        Error?: ScriptExecutionError,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ExecuteCloudScriptServerRequest */
    interface ExecuteCloudScriptServerRequest {
        /** 
         * The unique user identifier for the player on whose behalf the script is being
         * run
         */
        PlayFabId: string,
        /** The name of the CloudScript function to execute */
        FunctionName: string,
        /** Object that is passed in to the function as the first argument */
        FunctionParameter?: any,
        /** 
         * Option for which revision of the CloudScript to execute. 'Latest' executes the
         * most recently created revision, 'Live' executes the current live, published
         * revision, and 'Specific' executes the specified revision. The default value is
         * 'Specific', if the SpeificRevision parameter is specified, otherwise it is
         * 'Live'.
         */
        RevisionSelection?: CloudScriptRevisionOption,
        /** The specivic revision to execute, when RevisionSelection is set to 'Specific' */
        SpecificRevision?: number,
        /** 
         * Generate a 'player_executed_cloudscript' PlayStream event containing the
         * results of the function execution and other contextual information. This event
         * will show up in the PlayStream debugger console for the player in Game Manager.
         */
        GeneratePlayStreamEvent?: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.FacebookPlayFabIdPair */
    interface FacebookPlayFabIdPair {
        /** Unique Facebook identifier for a user. */
        FacebookId?: string,
        /** 
         * Unique PlayFab identifier for a user, or null if no PlayFab account is linked
         * to the Facebook identifier.
         */
        PlayFabId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.FriendInfo */
    interface FriendInfo {
        /** PlayFab unique identifier for this friend. */
        FriendPlayFabId?: string,
        /** PlayFab unique username for this friend. */
        Username?: string,
        /** Title-specific display name for this friend. */
        TitleDisplayName?: string,
        /** Tags which have been associated with this friend. */
        Tags?: string[],
        /** 
         * Unique lobby identifier of the Game Server Instance to which this player is
         * currently connected.
         */
        CurrentMatchmakerLobbyId?: string,
        /** 
         * Available Facebook information (if the user and PlayFab friend are also
         * connected in Facebook).
         */
        FacebookInfo?: UserFacebookInfo,
        /** 
         * Available Steam information (if the user and PlayFab friend are also connected
         * in Steam).
         */
        SteamInfo?: UserSteamInfo,
        /** 
         * Available Game Center information (if the user and PlayFab friend are also
         * connected in Game Center).
         */
        GameCenterInfo?: UserGameCenterInfo,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GameInstanceState */
    type GameInstanceState = "Open"
        | "Closed";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetActionGroupResult */
    interface GetActionGroupResult {
        /** Action Group name */
        Name: string,
        /** Action Group ID */
        Id?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetAllActionGroupsRequest */
    interface GetAllActionGroupsRequest {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetAllActionGroupsResult */
    interface GetAllActionGroupsResult {
        /** List of Action Groups. */
        ActionGroups: GetActionGroupResult[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetAllSegmentsRequest */
    interface GetAllSegmentsRequest {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetAllSegmentsResult */
    interface GetAllSegmentsResult {
        /** Array of segments for this title. */
        Segments?: GetSegmentResult[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCatalogItemsRequest */
    interface GetCatalogItemsRequest {
        /** Which catalog is being requested. If null, uses the default catalog. */
        CatalogVersion?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCatalogItemsResult */
    interface GetCatalogItemsResult {
        /** Array of items which can be purchased. */
        Catalog?: CatalogItem[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCharacterDataRequest */
    interface GetCharacterDataRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Specific keys to search for in the custom user data. */
        Keys?: string[],
        /** 
         * The version that currently exists according to the caller. The call will return
         * the data for all of the keys if the version in the system is greater than this.
         */
        IfChangedFromDataVersion?: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCharacterDataResult */
    interface GetCharacterDataResult {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId?: string,
        /** 
         * Indicates the current version of the data that has been set. This is
         * incremented with every set call for that type of data (read-only, internal,
         * etc). This version can be provided in Get calls to find updated data.
         */
        DataVersion: number,
        /** User specific data for this title. */
        Data?: { [key: string]: UserDataRecord },
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCharacterInventoryRequest */
    interface GetCharacterInventoryRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Used to limit results to only those from a specific catalog version. */
        CatalogVersion?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCharacterInventoryResult */
    interface GetCharacterInventoryResult {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId?: string,
        /** Unique identifier of the character for this inventory. */
        CharacterId?: string,
        /** Array of inventory items belonging to the character. */
        Inventory?: ItemInstance[],
        /** Array of virtual currency balance(s) belonging to the character. */
        VirtualCurrency?: { [key: string]: number },
        /** Array of remaining times and timestamps for virtual currencies. */
        VirtualCurrencyRechargeTimes?: { [key: string]: VirtualCurrencyRechargeTime },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCharacterLeaderboardRequest */
    interface GetCharacterLeaderboardRequest {
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Optional character type on which to filter the leaderboard entries. */
        CharacterType?: string,
        /** Unique identifier for the title-specific statistic for the leaderboard. */
        StatisticName: string,
        /** First entry in the leaderboard to be retrieved. */
        StartPosition: number,
        /** Maximum number of entries to retrieve. */
        MaxResultsCount: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCharacterLeaderboardResult */
    interface GetCharacterLeaderboardResult {
        /** Ordered list of leaderboard entries. */
        Leaderboard?: CharacterLeaderboardEntry[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCharacterStatisticsRequest */
    interface GetCharacterStatisticsRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetCharacterStatisticsResult */
    interface GetCharacterStatisticsResult {
        /** 
         * PlayFab unique identifier of the user whose character statistics are being
         * returned.
         */
        PlayFabId?: string,
        /** Unique identifier of the character for the statistics. */
        CharacterId?: string,
        /** Character statistics for the requested user. */
        CharacterStatistics?: { [key: string]: number },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetContentDownloadUrlRequest */
    interface GetContentDownloadUrlRequest {
        /** Key of the content item to fetch, usually formatted as a path, e.g. images/a.png */
        Key: string,
        /** 
         * HTTP method to fetch item - GET or HEAD. Use HEAD when only fetching metadata.
         * Default is GET.
         */
        HttpMethod?: string,
        /** 
         * True if download through CDN. CDN provides better download bandwidth and time.
         * However, if you want latest, non-cached version of the content, set this to
         * false. Default is true.
         */
        ThruCDN?: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetContentDownloadUrlResult */
    interface GetContentDownloadUrlResult {
        /** 
         * URL for downloading content via HTTP GET or HEAD method. The URL will expire in
         * 1 hour.
         */
        URL?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetFriendLeaderboardRequest */
    interface GetFriendLeaderboardRequest {
        /** The player whose friend leaderboard to get */
        PlayFabId: string,
        /** Statistic used to rank friends for this leaderboard. */
        StatisticName: string,
        /** Position in the leaderboard to start this listing (defaults to the first entry). */
        StartPosition: number,
        /** Maximum number of entries to retrieve. */
        MaxResultsCount: number,
        /** 
         * Indicates whether Steam service friends should be included in the response.
         * Default is true.
         */
        IncludeSteamFriends?: boolean,
        /** 
         * Indicates whether Facebook friends should be included in the response. Default
         * is true.
         */
        IncludeFacebookFriends?: boolean,
        /** The version of the leaderboard to get, when UseSpecificVersion is true. */
        Version?: number,
        /** If true, uses the specified version. If false, gets the most recent version. */
        UseSpecificVersion?: boolean,
        /** 
         * If non-null, this determines which properties of the profile to return. If
         * null, playfab will only include display names. On client, only
         * ShowDisplayName, ShowStatistics, ShowAvatarUrl are allowed.
         */
        ProfileConstraints?: PlayerProfileViewConstraints,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetFriendsListRequest */
    interface GetFriendsListRequest {
        /** PlayFab identifier of the player whose friend list to get. */
        PlayFabId: string,
        /** 
         * Indicates whether Steam service friends should be included in the response.
         * Default is true.
         */
        IncludeSteamFriends?: boolean,
        /** 
         * Indicates whether Facebook friends should be included in the response. Default
         * is true.
         */
        IncludeFacebookFriends?: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetFriendsListResult */
    interface GetFriendsListResult {
        /** Array of friends found. */
        Friends?: FriendInfo[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetLeaderboardAroundCharacterRequest */
    interface GetLeaderboardAroundCharacterRequest {
        /** Unique identifier for the title-specific statistic for the leaderboard. */
        StatisticName: string,
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Optional character type on which to filter the leaderboard entries. */
        CharacterType?: string,
        /** Maximum number of entries to retrieve. */
        MaxResultsCount: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetLeaderboardAroundCharacterResult */
    interface GetLeaderboardAroundCharacterResult {
        /** Ordered list of leaderboard entries. */
        Leaderboard?: CharacterLeaderboardEntry[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetLeaderboardAroundUserRequest */
    interface GetLeaderboardAroundUserRequest {
        /** Unique identifier for the title-specific statistic for the leaderboard. */
        StatisticName: string,
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Maximum number of entries to retrieve. */
        MaxResultsCount: number,
        /** 
         * If non-null, this determines which properties of the profile to return. If
         * null, playfab will only include display names. On client, only
         * ShowDisplayName, ShowStatistics, ShowAvatarUrl are allowed.
         */
        ProfileConstraints?: PlayerProfileViewConstraints,
        /** The version of the leaderboard to get, when UseSpecificVersion is true. */
        Version?: number,
        /** If true, uses the specified version. If false, gets the most recent version. */
        UseSpecificVersion?: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetLeaderboardAroundUserResult */
    interface GetLeaderboardAroundUserResult {
        /** Ordered listing of users and their positions in the requested leaderboard. */
        Leaderboard?: PlayerLeaderboardEntry[],
        /** The version of the leaderboard returned. */
        Version: number,
        /** 
         * The time the next scheduled reset will occur. Null if the leaderboard does not
         * reset on a schedule.
         */
        NextReset?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetLeaderboardForUsersCharactersRequest */
    interface GetLeaderboardForUsersCharactersRequest {
        /** Unique identifier for the title-specific statistic for the leaderboard. */
        StatisticName: string,
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Maximum number of entries to retrieve. */
        MaxResultsCount: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetLeaderboardForUsersCharactersResult */
    interface GetLeaderboardForUsersCharactersResult {
        /** Ordered list of leaderboard entries. */
        Leaderboard?: CharacterLeaderboardEntry[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetLeaderboardRequest */
    interface GetLeaderboardRequest {
        /** Unique identifier for the title-specific statistic for the leaderboard. */
        StatisticName: string,
        /** First entry in the leaderboard to be retrieved. */
        StartPosition: number,
        /** Maximum number of entries to retrieve. */
        MaxResultsCount: number,
        /** 
         * If non-null, this determines which properties of the profile to return. If
         * null, playfab will only include display names. On client, only
         * ShowDisplayName, ShowStatistics, ShowAvatarUrl are allowed.
         */
        ProfileConstraints?: PlayerProfileViewConstraints,
        /** The version of the leaderboard to get, when UseSpecificVersion is true. */
        Version?: number,
        /** If true, uses the specified version. If false, gets the most recent version. */
        UseSpecificVersion?: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetLeaderboardResult */
    interface GetLeaderboardResult {
        /** Ordered listing of users and their positions in the requested leaderboard. */
        Leaderboard?: PlayerLeaderboardEntry[],
        /** The version of the leaderboard returned. */
        Version: number,
        /** 
         * The time the next scheduled reset will occur. Null if the leaderboard does not
         * reset on a schedule.
         */
        NextReset?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerCombinedInfoRequest */
    interface GetPlayerCombinedInfoRequest {
        /** PlayFabId of the user whose data will be returned */
        PlayFabId: string,
        /** Flags for which pieces of info to return for the user. */
        InfoRequestParameters: GetPlayerCombinedInfoRequestParams,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerCombinedInfoRequestParams */
    interface GetPlayerCombinedInfoRequestParams {
        /** Whether to get the player's account Info. Defaults to false */
        GetUserAccountInfo: boolean,
        /** Whether to get the player's inventory. Defaults to false */
        GetUserInventory: boolean,
        /** Whether to get the player's virtual currency balances. Defaults to false */
        GetUserVirtualCurrency: boolean,
        /** Whether to get the player's custom data. Defaults to false */
        GetUserData: boolean,
        /** 
         * Specific keys to search for in the custom data. Leave null to get all keys. Has
         * no effect if GetUserData is false
         */
        UserDataKeys?: string[],
        /** Whether to get the player's read only data. Defaults to false */
        GetUserReadOnlyData: boolean,
        /** 
         * Specific keys to search for in the custom data. Leave null to get all keys. Has
         * no effect if GetUserReadOnlyData is false
         */
        UserReadOnlyDataKeys?: string[],
        /** Whether to get character inventories. Defaults to false. */
        GetCharacterInventories: boolean,
        /** Whether to get the list of characters. Defaults to false. */
        GetCharacterList: boolean,
        /** Whether to get title data. Defaults to false. */
        GetTitleData: boolean,
        /** 
         * Specific keys to search for in the custom data. Leave null to get all keys. Has
         * no effect if GetTitleData is false
         */
        TitleDataKeys?: string[],
        /** Whether to get player statistics. Defaults to false. */
        GetPlayerStatistics: boolean,
        /** 
         * Specific statistics to retrieve. Leave null to get all keys. Has no effect if
         * GetPlayerStatistics is false
         */
        PlayerStatisticNames?: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerCombinedInfoResult */
    interface GetPlayerCombinedInfoResult {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId?: string,
        /** Results for requested info. */
        InfoResultPayload?: GetPlayerCombinedInfoResultPayload,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerCombinedInfoResultPayload */
    interface GetPlayerCombinedInfoResultPayload {
        /** Account information for the user. This is always retrieved. */
        AccountInfo?: UserAccountInfo,
        /** Array of inventory items in the user's current inventory. */
        UserInventory?: ItemInstance[],
        /** Dictionary of virtual currency balance(s) belonging to the user. */
        UserVirtualCurrency?: { [key: string]: number },
        /** Dictionary of remaining times and timestamps for virtual currencies. */
        UserVirtualCurrencyRechargeTimes?: { [key: string]: VirtualCurrencyRechargeTime },
        /** User specific custom data. */
        UserData?: { [key: string]: UserDataRecord },
        /** The version of the UserData that was returned. */
        UserDataVersion: number,
        /** User specific read-only data. */
        UserReadOnlyData?: { [key: string]: UserDataRecord },
        /** The version of the Read-Only UserData that was returned. */
        UserReadOnlyDataVersion: number,
        /** List of characters for the user. */
        CharacterList?: CharacterResult[],
        /** Inventories for each character for the user. */
        CharacterInventories?: CharacterInventory[],
        /** Title data for this title. */
        TitleData?: { [key: string]: string },
        /** List of statistics for this player. */
        PlayerStatistics?: StatisticValue[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerSegmentsResult */
    interface GetPlayerSegmentsResult {
        /** Array of segments the requested player currently belongs to. */
        Segments?: GetSegmentResult[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayersInSegmentRequest */
    interface GetPlayersInSegmentRequest {
        /** Unique identifier for this segment. */
        SegmentId: string,
        /** 
         * Number of seconds to keep the continuation token active. After token expiration
         * it is not possible to continue paging results. Default is 300 (5 minutes).
         * Maximum is 1,800 (30 minutes).
         */
        SecondsToLive?: number,
        /** Maximum number of profiles to load. Default is 1,000. Maximum is 10,000. */
        MaxBatchSize?: number,
        /** Continuation token if retrieving subsequent pages of results. */
        ContinuationToken?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayersInSegmentResult */
    interface GetPlayersInSegmentResult {
        /** Count of profiles matching this segment. */
        ProfilesInSegment: number,
        /** 
         * Continuation token to use to retrieve subsequent pages of results. If token
         * returns null there are no more results.
         */
        ContinuationToken?: string,
        /** Array of player profiles in this segment. */
        PlayerProfiles?: PlayerProfile[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayersSegmentsRequest */
    interface GetPlayersSegmentsRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerStatisticsRequest */
    interface GetPlayerStatisticsRequest {
        /** user for whom statistics are being requested */
        PlayFabId: string,
        /** statistics to return */
        StatisticNames?: string[],
        /** 
         * statistics to return, if StatisticNames is not set (only statistics which have
         * a version matching that provided will be returned)
         */
        StatisticNameVersions?: StatisticNameVersion[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerStatisticsResult */
    interface GetPlayerStatisticsResult {
        /** PlayFab unique identifier of the user whose statistics are being returned */
        PlayFabId?: string,
        /** User statistics for the requested user. */
        Statistics?: StatisticValue[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerStatisticVersionsRequest */
    interface GetPlayerStatisticVersionsRequest {
        /** unique name of the statistic */
        StatisticName?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerStatisticVersionsResult */
    interface GetPlayerStatisticVersionsResult {
        /** version change history of the statistic */
        StatisticVersions?: PlayerStatisticVersion[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerTagsRequest */
    interface GetPlayerTagsRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Optional namespace to filter results by */
        Namespace?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayerTagsResult */
    interface GetPlayerTagsResult {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Canonical tags (including namespace and tag's name) for the requested user */
        Tags: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayFabIDsFromFacebookIDsRequest */
    interface GetPlayFabIDsFromFacebookIDsRequest {
        /** 
         * Array of unique Facebook identifiers for which the title needs to get PlayFab
         * identifiers.
         */
        FacebookIDs: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayFabIDsFromFacebookIDsResult */
    interface GetPlayFabIDsFromFacebookIDsResult {
        /** Mapping of Facebook identifiers to PlayFab identifiers. */
        Data?: FacebookPlayFabIdPair[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayFabIDsFromSteamIDsRequest */
    interface GetPlayFabIDsFromSteamIDsRequest {
        /** 
         * Array of unique Steam identifiers (Steam profile IDs) for which the title needs
         * to get PlayFab identifiers.
         */
        SteamStringIDs?: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPlayFabIDsFromSteamIDsResult */
    interface GetPlayFabIDsFromSteamIDsResult {
        /** Mapping of Steam identifiers to PlayFab identifiers. */
        Data?: SteamPlayFabIdPair[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPublisherDataRequest */
    interface GetPublisherDataRequest {
        /** 
         * array of keys to get back data from the Publisher data blob, set by the admin
         * tools
         */
        Keys: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetPublisherDataResult */
    interface GetPublisherDataResult {
        /** a dictionary object of key / value pairs */
        Data?: { [key: string]: string },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetRandomResultTablesRequest */
    interface GetRandomResultTablesRequest {
        /** 
         * Specifies the catalog version that should be used to retrieve the Random Result
         * Tables.  If unspecified, uses default/primary catalog.
         */
        CatalogVersion?: string,
        /** The unique identifier of the Random Result Table to use. */
        TableIDs: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetRandomResultTablesResult */
    interface GetRandomResultTablesResult {
        /** array of random result tables currently available */
        Tables?: { [key: string]: RandomResultTableListing },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetSegmentResult */
    interface GetSegmentResult {
        /** Unique identifier for this segment. */
        Id: string,
        /** Segment name. */
        Name?: string,
        /** Identifier of the segments AB Test, if it is attached to one. */
        ABTestParent?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetSharedGroupDataRequest */
    interface GetSharedGroupDataRequest {
        /** Unique identifier for the shared group. */
        SharedGroupId: string,
        /** 
         * Specific keys to retrieve from the shared group (if not specified, all keys
         * will be returned, while an empty array indicates that no keys should be
         * returned).
         */
        Keys?: string[],
        /** If true, return the list of all members of the shared group. */
        GetMembers?: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetSharedGroupDataResult */
    interface GetSharedGroupDataResult {
        /** Data for the requested keys. */
        Data?: { [key: string]: SharedGroupDataRecord },
        /** List of PlayFabId identifiers for the members of this group, if requested. */
        Members?: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetTimeRequest */
    interface GetTimeRequest {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetTimeResult */
    interface GetTimeResult {
        /** Current server time when the request was received, in UTC */
        Time: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetTitleDataRequest */
    interface GetTitleDataRequest {
        /** Specific keys to search for in the title data (leave null to get all keys) */
        Keys?: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetTitleDataResult */
    interface GetTitleDataResult {
        /** a dictionary object of key / value pairs */
        Data?: { [key: string]: string },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetTitleNewsRequest */
    interface GetTitleNewsRequest {
        /** Limits the results to the last n entries. Defaults to 10 if not set. */
        Count?: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetTitleNewsResult */
    interface GetTitleNewsResult {
        /** Array of news items. */
        News?: TitleNewsItem[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetUserAccountInfoRequest */
    interface GetUserAccountInfoRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetUserAccountInfoResult */
    interface GetUserAccountInfoResult {
        /** Account details for the user whose information was requested. */
        UserInfo?: UserAccountInfo,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetUserBansRequest */
    interface GetUserBansRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetUserBansResult */
    interface GetUserBansResult {
        /** Information about the bans */
        BanData?: BanInfo[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetUserDataRequest */
    interface GetUserDataRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Specific keys to search for in the custom user data. */
        Keys?: string[],
        /** 
         * The version that currently exists according to the caller. The call will return
         * the data for all of the keys if the version in the system is greater than this.
         */
        IfChangedFromDataVersion?: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetUserDataResult */
    interface GetUserDataResult {
        /** PlayFab unique identifier of the user whose custom data is being returned. */
        PlayFabId?: string,
        /** 
         * Indicates the current version of the data that has been set. This is
         * incremented with every set call for that type of data (read-only, internal,
         * etc). This version can be provided in Get calls to find updated data.
         */
        DataVersion: number,
        /** User specific data for this title. */
        Data?: { [key: string]: UserDataRecord },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetUserInventoryRequest */
    interface GetUserInventoryRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GetUserInventoryResult */
    interface GetUserInventoryResult {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId?: string,
        /** Array of inventory items belonging to the user. */
        Inventory?: ItemInstance[],
        /** Array of virtual currency balance(s) belonging to the user. */
        VirtualCurrency?: { [key: string]: number },
        /** Array of remaining times and timestamps for virtual currencies. */
        VirtualCurrencyRechargeTimes?: { [key: string]: VirtualCurrencyRechargeTime },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantCharacterToUserRequest */
    interface GrantCharacterToUserRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Non-unique display name of the character being granted. */
        CharacterName: string,
        /** 
         * Type of the character being granted; statistics can be sliced based on this
         * value.
         */
        CharacterType: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantCharacterToUserResult */
    interface GrantCharacterToUserResult {
        /** Unique identifier tagged to this character. */
        CharacterId?: string,
    }

    /** 
     * Result of granting an item to a user
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantedItemInstance
     */
    interface GrantedItemInstance {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId?: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId?: string,
        /** Result of this operation. */
        Result: boolean,
        /** Unique identifier for the inventory item, as defined in the catalog. */
        ItemId?: string,
        /** Unique item identifier for this specific instance of the item. */
        ItemInstanceId?: string,
        /** Class name for the inventory item, as defined in the catalog. */
        ItemClass?: string,
        /** Timestamp for when this instance was purchased. */
        PurchaseDate?: string,
        /** Timestamp for when this instance will expire. */
        Expiration?: string,
        /** Total number of remaining uses, if this is a consumable item. */
        RemainingUses?: number,
        /** The number of uses that were added or removed to this item in this call. */
        UsesIncrementedBy?: number,
        /** 
         * Game specific comment associated with this instance when it was added to the
         * user inventory.
         */
        Annotation?: string,
        /** Catalog version for the inventory item, when this instance was created. */
        CatalogVersion?: string,
        /** 
         * Unique identifier for the parent inventory item, as defined in the catalog, for
         * object which were added from a bundle or container.
         */
        BundleParent?: string,
        /** CatalogItem.DisplayName at the time this item was purchased. */
        DisplayName?: string,
        /** Currency type for the cost of the catalog item. */
        UnitCurrency?: string,
        /** Cost of the catalog item in the given currency. */
        UnitPrice: number,
        /** Array of unique items that were awarded when this catalog item was purchased. */
        BundleContents?: string[],
        /** A set of custom key-value pairs on the inventory item. */
        CustomData?: { [key: string]: string },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantItemsToCharacterRequest */
    interface GrantItemsToCharacterRequest {
        /** Catalog version from which items are to be granted. */
        CatalogVersion?: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** String detailing any additional information concerning this operation. */
        Annotation?: string,
        /** Array of itemIds to grant to the user. */
        ItemIds?: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantItemsToCharacterResult */
    interface GrantItemsToCharacterResult {
        /** Array of items granted to users. */
        ItemGrantResults?: GrantedItemInstance[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantItemsToUserRequest */
    interface GrantItemsToUserRequest {
        /** Catalog version from which items are to be granted. */
        CatalogVersion?: string,
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** String detailing any additional information concerning this operation. */
        Annotation?: string,
        /** Array of itemIds to grant to the user. */
        ItemIds: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantItemsToUserResult */
    interface GrantItemsToUserResult {
        /** Array of items granted to users. */
        ItemGrantResults?: GrantedItemInstance[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantItemsToUsersRequest */
    interface GrantItemsToUsersRequest {
        /** Catalog version from which items are to be granted. */
        CatalogVersion?: string,
        /** Array of items to grant and the users to whom the items are to be granted. */
        ItemGrants: ItemGrant[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.GrantItemsToUsersResult */
    interface GrantItemsToUsersResult {
        /** Array of items granted to users. */
        ItemGrantResults?: GrantedItemInstance[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ItemGrant */
    interface ItemGrant {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique identifier of the catalog item to be granted to the user. */
        ItemId: string,
        /** String detailing any additional information concerning this operation. */
        Annotation?: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId?: string,
        /** 
         * Key-value pairs to be written to the custom data. Note that keys are trimmed of
         * whitespace, are limited in size, and may not begin with a '!' character.
         */
        Data?: { [key: string]: string },
        /** 
         * Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert
         * null-values into Data due to language constraints.  Use this to delete the
         * keys directly.
         */
        KeysToRemove?: string[],
    }

    /** 
     * A unique instance of an item in a user's inventory. Note, to retrieve
     * additional information for an item instance (such as Tags, Description, or
     * Custom Data that are set on the root catalog item), a call to GetCatalogItems
     * is required. The Item ID of the instance can then be matched to a catalog
     * entry, which contains the additional information. Also note that Custom Data
     * is only set here from a call to UpdateUserInventoryItemCustomData.
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ItemInstance
     */
    interface ItemInstance {
        /** Unique identifier for the inventory item, as defined in the catalog. */
        ItemId?: string,
        /** Unique item identifier for this specific instance of the item. */
        ItemInstanceId?: string,
        /** Class name for the inventory item, as defined in the catalog. */
        ItemClass?: string,
        /** Timestamp for when this instance was purchased. */
        PurchaseDate?: string,
        /** Timestamp for when this instance will expire. */
        Expiration?: string,
        /** Total number of remaining uses, if this is a consumable item. */
        RemainingUses?: number,
        /** The number of uses that were added or removed to this item in this call. */
        UsesIncrementedBy?: number,
        /** 
         * Game specific comment associated with this instance when it was added to the
         * user inventory.
         */
        Annotation?: string,
        /** Catalog version for the inventory item, when this instance was created. */
        CatalogVersion?: string,
        /** 
         * Unique identifier for the parent inventory item, as defined in the catalog, for
         * object which were added from a bundle or container.
         */
        BundleParent?: string,
        /** CatalogItem.DisplayName at the time this item was purchased. */
        DisplayName?: string,
        /** Currency type for the cost of the catalog item. */
        UnitCurrency?: string,
        /** Cost of the catalog item in the given currency. */
        UnitPrice: number,
        /** Array of unique items that were awarded when this catalog item was purchased. */
        BundleContents?: string[],
        /** A set of custom key-value pairs on the inventory item. */
        CustomData?: { [key: string]: string },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.LinkedPlatformAccountModel */
    interface LinkedPlatformAccountModel {
        /** Authentication platform */
        Platform?: LoginIdentityProvider,
        /** Unique account identifier of the user on the platform */
        PlatformUserId?: string,
        /** Linked account username of the user on the platform, if available */
        Username?: string,
        /** Linked account email of the user on the platform, if available */
        Email?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ListUsersCharactersRequest */
    interface ListUsersCharactersRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ListUsersCharactersResult */
    interface ListUsersCharactersResult {
        /** The requested list of characters. */
        Characters?: CharacterResult[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.LocationModel */
    interface LocationModel {
        /** The two-character continent code for this location */
        ContinentCode?: ContinentCode,
        /** 
         * The two-character ISO 3166-1 country code for the country associated with the
         * location
         */
        CountryCode?: CountryCode,
        /** City name. */
        City?: string,
        /** Latitude coordinate of the geographic location. */
        Latitude?: number,
        /** Longitude coordinate of the geographic location. */
        Longitude?: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.LoginIdentityProvider */
    type LoginIdentityProvider = "Unknown"
        | "PlayFab"
        | "Custom"
        | "GameCenter"
        | "GooglePlay"
        | "Steam"
        | "XBoxLive"
        | "PSN"
        | "Kongregate"
        | "Facebook"
        | "IOSDevice"
        | "AndroidDevice"
        | "Twitch"
        | "WindowsHello";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.LogStatement */
    interface LogStatement {
        /** 'Debug', 'Info', or 'Error' */
        Level?: string,
        Message?: string,
        /** Optional object accompanying the message as contextual information */
        Data?: any,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ModifyCharacterVirtualCurrencyResult */
    interface ModifyCharacterVirtualCurrencyResult {
        /** Name of the virtual currency which was modified. */
        VirtualCurrency?: string,
        /** Balance of the virtual currency after modification. */
        Balance: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ModifyItemUsesRequest */
    interface ModifyItemUsesRequest {
        /** PlayFab unique identifier of the user whose item is being modified. */
        PlayFabId: string,
        /** Unique instance identifier of the item to be modified. */
        ItemInstanceId: string,
        /** Number of uses to add to the item. Can be negative to remove uses. */
        UsesToAdd: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ModifyItemUsesResult */
    interface ModifyItemUsesResult {
        /** Unique instance identifier of the item with uses consumed. */
        ItemInstanceId?: string,
        /** Number of uses remaining on the item. */
        RemainingUses: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ModifyUserVirtualCurrencyResult */
    interface ModifyUserVirtualCurrencyResult {
        /** User currency was subtracted from. */
        PlayFabId?: string,
        /** Name of the virtual currency which was modified. */
        VirtualCurrency?: string,
        /** 
         * Amount added or subtracted from the user's virtual currency. Maximum VC balance
         * is Int32 (2,147,483,647). Any increase over this value will be discarded.
         */
        BalanceChange: number,
        /** Balance of the virtual currency after modification. */
        Balance: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.MoveItemToCharacterFromCharacterRequest */
    interface MoveItemToCharacterFromCharacterRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique identifier of the character that currently has the item. */
        GivingCharacterId: string,
        /** Unique identifier of the character that will be receiving the item. */
        ReceivingCharacterId: string,
        /** Unique PlayFab assigned instance identifier of the item */
        ItemInstanceId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.MoveItemToCharacterFromCharacterResult */
    interface MoveItemToCharacterFromCharacterResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.MoveItemToCharacterFromUserRequest */
    interface MoveItemToCharacterFromUserRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Unique PlayFab assigned instance identifier of the item */
        ItemInstanceId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.MoveItemToCharacterFromUserResult */
    interface MoveItemToCharacterFromUserResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.MoveItemToUserFromCharacterRequest */
    interface MoveItemToUserFromCharacterRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Unique PlayFab assigned instance identifier of the item */
        ItemInstanceId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.MoveItemToUserFromCharacterResult */
    interface MoveItemToUserFromCharacterResult {
    }

    /** 
     * Identifier by either name or ID. Note that a name may change due to renaming,
     * or reused after being deleted. ID is immutable and unique.
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.NameIdentifier
     */
    interface NameIdentifier {
        Name?: string,
        Id?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.NotifyMatchmakerPlayerLeftRequest */
    interface NotifyMatchmakerPlayerLeftRequest {
        /** Unique identifier of the Game Instance the user is leaving. */
        LobbyId: string,
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.NotifyMatchmakerPlayerLeftResult */
    interface NotifyMatchmakerPlayerLeftResult {
        /** State of user leaving the Game Server Instance. */
        PlayerState?: PlayerConnectionState,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerConnectionState */
    type PlayerConnectionState = "Unassigned"
        | "Connecting"
        | "Participating"
        | "Participated";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerLeaderboardEntry */
    interface PlayerLeaderboardEntry {
        /** PlayFab unique identifier of the user for this leaderboard entry. */
        PlayFabId?: string,
        /** Title-specific display name of the user for this leaderboard entry. */
        DisplayName?: string,
        /** Specific value of the user's statistic. */
        StatValue: number,
        /** User's overall position in the leaderboard. */
        Position: number,
        /** The profile of the user, if requested. */
        Profile?: PlayerProfileModel,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerLinkedAccount */
    interface PlayerLinkedAccount {
        /** Authentication platform */
        Platform?: LoginIdentityProvider,
        /** Platform user identifier */
        PlatformUserId?: string,
        /** Linked account's username */
        Username?: string,
        /** Linked account's email */
        Email?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerLocation */
    interface PlayerLocation {
        /** The two-character continent code for this location */
        ContinentCode: ContinentCode,
        /** 
         * The two-character ISO 3166-1 country code for the country associated with the
         * location
         */
        CountryCode: CountryCode,
        /** City of the player's geographic location. */
        City?: string,
        /** Latitude coordinate of the player's geographic location. */
        Latitude?: number,
        /** Longitude coordinate of the player's geographic location. */
        Longitude?: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerProfile */
    interface PlayerProfile {
        /** PlayFab Player ID */
        PlayerId?: string,
        /** Title ID this profile applies to */
        TitleId?: string,
        /** Player Display Name */
        DisplayName?: string,
        /** Publisher this player belongs to */
        PublisherId?: string,
        /** Player account origination */
        Origination?: LoginIdentityProvider,
        /** Player record created */
        Created?: string,
        /** Last login */
        LastLogin?: string,
        /** 
         * Banned until UTC Date. If permanent ban this is set for 20 years after the
         * original ban date.
         */
        BannedUntil?: string,
        /** Image URL of the player's avatar. */
        AvatarUrl?: string,
        /** Dictionary of player's statistics using only the latest version's value */
        Statistics?: { [key: string]: number },
        /** A sum of player's total purchases in USD across all currencies. */
        TotalValueToDateInUSD?: number,
        /** Dictionary of player's total purchases by currency. */
        ValuesToDate?: { [key: string]: number },
        /** List of player's tags for segmentation. */
        Tags?: string[],
        /** Dictionary of player's locations by type. */
        Locations?: { [key: string]: PlayerLocation },
        /** Dictionary of player's virtual currency balances */
        VirtualCurrencyBalances?: { [key: string]: number },
        /** Array of ad campaigns player has been attributed to */
        AdCampaignAttributions?: AdCampaignAttribution[],
        /** Array of configured push notification end points */
        PushNotificationRegistrations?: PushNotificationRegistration[],
        /** Array of third party accounts linked to this player */
        LinkedAccounts?: PlayerLinkedAccount[],
        /** Array of player statistics */
        PlayerStatistics?: PlayerStatistic[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerProfileModel */
    interface PlayerProfileModel {
        /** Publisher this player belongs to */
        PublisherId?: string,
        /** Title ID this profile applies to */
        TitleId?: string,
        /** PlayFab Player ID */
        PlayerId?: string,
        /** Player record created */
        Created?: string,
        /** Player account origination */
        Origination?: LoginIdentityProvider,
        /** Last login */
        LastLogin?: string,
        /** If the player is currently banned, the UTC Date when the ban expires */
        BannedUntil?: string,
        /** List of geographic locations where the player has logged-in */
        Locations?: LocationModel[],
        /** Player Display Name */
        DisplayName?: string,
        /** Image URL of the player's avatar */
        AvatarUrl?: string,
        /** List of player's tags for segmentation */
        Tags?: TagModel[],
        /** 
         * List of configured end points registered for sending the player push
         * notifications
         */
        PushNotificationRegistrations?: PushNotificationRegistrationModel[],
        /** List of third party accounts linked to this player */
        LinkedAccounts?: LinkedPlatformAccountModel[],
        /** List of advertising campaigns the player has been attributed to */
        AdCampaignAttributions?: AdCampaignAttributionModel[],
        /** 
         * A sum of player's total purchases across all real-money currencies, converted
         * to US Dollars equivalent
         */
        TotalValueToDateInUSD?: number,
        /** List of player's total lifetime real-money purchases by currency */
        ValuesToDate?: ValueToDateModel[],
        /** List of player's virtual currency balances */
        VirtualCurrencyBalances?: VirtualCurrencyBalanceModel[],
        /** List of leaderboard statistic values for the player */
        Statistics?: StatisticModel[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerProfileViewConstraints */
    interface PlayerProfileViewConstraints {
        /** Whether to show the display name. Defaults to false */
        ShowDisplayName: boolean,
        /** Whether to show the created date. Defaults to false */
        ShowCreated: boolean,
        /** Whether to show origination. Defaults to false */
        ShowOrigination: boolean,
        /** Whether to show the last login time. Defaults to false */
        ShowLastLogin: boolean,
        /** Whether to show the banned until time. Defaults to false */
        ShowBannedUntil: boolean,
        /** Reserved for future development */
        ShowStatistics: boolean,
        /** Whether to show campaign attributions. Defaults to false */
        ShowCampaignAttributions: boolean,
        /** Whether to show push notification registrations. Defaults to false */
        ShowPushNotificationRegistrations: boolean,
        /** Whether to show the linked accounts. Defaults to false */
        ShowLinkedAccounts: boolean,
        /** Whether to show the total value to date in usd. Defaults to false */
        ShowTotalValueToDateInUsd: boolean,
        /** Whether to show the values to date. Defaults to false */
        ShowValuesToDate: boolean,
        /** Whether to show tags. Defaults to false */
        ShowTags: boolean,
        /** Whether to show player's locations. Defaults to false */
        ShowLocations: boolean,
        /** Whether to show player's avatar URL. Defaults to false */
        ShowAvatarUrl: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerStatistic */
    interface PlayerStatistic {
        /** Statistic ID */
        Id?: string,
        /** Statistic version (0 if not a versioned statistic) */
        StatisticVersion: number,
        /** Current statistic value */
        StatisticValue: number,
        /** Statistic name */
        Name?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PlayerStatisticVersion */
    interface PlayerStatisticVersion {
        /** name of the statistic when the version became active */
        StatisticName?: string,
        /** version of the statistic */
        Version: number,
        /** 
         * time at which the statistic version was scheduled to become active, based on
         * the configured ResetInterval
         */
        ScheduledActivationTime?: string,
        /** time when the statistic version became active */
        ActivationTime: string,
        /** 
         * time at which the statistic version was scheduled to become inactive, based on
         * the configured ResetInterval
         */
        ScheduledDeactivationTime?: string,
        /** 
         * time when the statistic version became inactive due to statistic version
         * incrementing
         */
        DeactivationTime?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PushNotificationPlatform */
    type PushNotificationPlatform = "ApplePushNotificationService"
        | "GoogleCloudMessaging";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PushNotificationRegistration */
    interface PushNotificationRegistration {
        /** Push notification platform */
        Platform?: PushNotificationPlatform,
        /** Notification configured endpoint */
        NotificationEndpointARN?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.PushNotificationRegistrationModel */
    interface PushNotificationRegistrationModel {
        /** Push notification platform */
        Platform?: PushNotificationPlatform,
        /** Notification configured endpoint */
        NotificationEndpointARN?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RandomResultTableListing */
    interface RandomResultTableListing {
        /** Catalog version this table is associated with */
        CatalogVersion?: string,
        /** Unique name for this drop table */
        TableId: string,
        /** Child nodes that indicate what kind of drop table item this actually is. */
        Nodes: ResultTableNode[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RedeemCouponRequest */
    interface RedeemCouponRequest {
        /** Generated coupon code to redeem. */
        CouponCode: string,
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Catalog version of the coupon. */
        CatalogVersion?: string,
        /** 
         * Optional identifier for the Character that should receive the item. If null,
         * item is added to the player
         */
        CharacterId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RedeemCouponResult */
    interface RedeemCouponResult {
        /** Items granted to the player as a result of redeeming the coupon. */
        GrantedItems?: ItemInstance[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RedeemMatchmakerTicketRequest */
    interface RedeemMatchmakerTicketRequest {
        /** Server authorization ticket passed back from a call to Matchmake or StartGame. */
        Ticket: string,
        /** 
         * Unique identifier of the Game Server Instance that is asking for validation of
         * the authorization ticket.
         */
        LobbyId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RedeemMatchmakerTicketResult */
    interface RedeemMatchmakerTicketResult {
        /** Boolean indicating whether the ticket was validated by the PlayFab service. */
        TicketIsValid: boolean,
        /** Error value if the ticket was not validated. */
        Error?: string,
        /** User account information for the user validated. */
        UserInfo?: UserAccountInfo,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RefreshGameServerInstanceHeartbeatRequest */
    interface RefreshGameServerInstanceHeartbeatRequest {
        /** 
         * Unique identifier of the Game Server Instance for which the heartbeat is
         * updated.
         */
        LobbyId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RefreshGameServerInstanceHeartbeatResult */
    interface RefreshGameServerInstanceHeartbeatResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.Region */
    type Region = "USCentral"
        | "USEast"
        | "EUWest"
        | "Singapore"
        | "Japan"
        | "Brazil"
        | "Australia";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RegisterGameRequest */
    interface RegisterGameRequest {
        /** IP address of the Game Server Instance. */
        ServerHost: string,
        /** Port number for communication with the Game Server Instance. */
        ServerPort: string,
        /** Unique identifier of the build running on the Game Server Instance. */
        Build: string,
        /** 
         * Region in which the Game Server Instance is running. For matchmaking using
         * non-AWS region names, set this to any AWS region and use Tags (below) to
         * specify your custom region.
         */
        Region: Region,
        /** 
         * Game Mode the Game Server instance is running. Note that this must be defined
         * in the Game Modes tab in the PlayFab Game Manager, along with the Build ID
         * (the same Game Mode can be defined for multiple Build IDs).
         */
        GameMode: string,
        /** Tags for the Game Server Instance */
        Tags?: { [key: string]: string },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RegisterGameResponse */
    interface RegisterGameResponse {
        /** Unique identifier generated for the Game Server Instance that is registered. */
        LobbyId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RemoveFriendRequest */
    interface RemoveFriendRequest {
        /** PlayFab identifier of the friend account which is to be removed. */
        FriendPlayFabId: string,
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RemovePlayerTagRequest */
    interface RemovePlayerTagRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique tag for player profile. */
        TagName: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RemovePlayerTagResult */
    interface RemovePlayerTagResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RemoveSharedGroupMembersRequest */
    interface RemoveSharedGroupMembersRequest {
        /** Unique identifier for the shared group. */
        SharedGroupId: string,
        /** 
         * An array of unique PlayFab assigned ID of the user on whom the operation will
         * be performed.
         */
        PlayFabIds: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RemoveSharedGroupMembersResult */
    interface RemoveSharedGroupMembersResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ReportPlayerServerRequest */
    interface ReportPlayerServerRequest {
        /** PlayFabId of the reporting player. */
        ReporterId: string,
        /** PlayFabId of the reported player. */
        ReporteeId: string,
        /** Title player was reported in, optional if report not for specific title. */
        TitleId?: string,
        /** Optional additional comment by reporting player. */
        Comment?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ReportPlayerServerResult */
    interface ReportPlayerServerResult {
        /** Indicates whether this action completed successfully. */
        Updated: boolean,
        /** 
         * The number of remaining reports which may be filed today by this reporting
         * player.
         */
        SubmissionsRemaining: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ResultTableNode */
    interface ResultTableNode {
        /** Whether this entry in the table is an item or a link to another table */
        ResultItemType: ResultTableNodeType,
        /** Either an ItemId, or the TableId of another random result table */
        ResultItem: string,
        /** How likely this is to be rolled - larger numbers add more weight */
        Weight: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ResultTableNodeType */
    type ResultTableNodeType = "ItemId"
        | "TableId";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RevokeAllBansForUserRequest */
    interface RevokeAllBansForUserRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RevokeAllBansForUserResult */
    interface RevokeAllBansForUserResult {
        /** Information on the bans that were revoked. */
        BanData?: BanInfo[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RevokeBansRequest */
    interface RevokeBansRequest {
        /** Ids of the bans to be revoked. Maximum 100. */
        BanIds: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RevokeBansResult */
    interface RevokeBansResult {
        /** Information on the bans that were revoked */
        BanData?: BanInfo[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RevokeInventoryItemRequest */
    interface RevokeInventoryItemRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId?: string,
        /** Unique PlayFab assigned instance identifier of the item */
        ItemInstanceId: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.RevokeInventoryResult */
    interface RevokeInventoryResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ScriptExecutionError */
    interface ScriptExecutionError {
        /** 
         * Error code, such as CloudScriptNotFound, JavascriptException,
         * CloudScriptFunctionArgumentSizeExceeded, CloudScriptAPIRequestCountExceeded,
         * CloudScriptAPIRequestError, or CloudScriptHTTPRequestError
         */
        Error?: string,
        /** Details about the error */
        Message?: string,
        /** Point during the execution of the script at which the error occurred, if any */
        StackTrace?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SendPushNotificationRequest */
    interface SendPushNotificationRequest {
        /** PlayFabId of the recipient of the push notification. */
        Recipient: string,
        /** Text of message to send. */
        Message: string,
        /** Subject of message to send (may not be displayed in all platforms. */
        Subject?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SendPushNotificationResult */
    interface SendPushNotificationResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetFriendTagsRequest */
    interface SetFriendTagsRequest {
        /** PlayFab identifier of the player whose friend is to be updated. */
        PlayFabId: string,
        /** PlayFab identifier of the friend account to which the tag(s) should be applied. */
        FriendPlayFabId: string,
        /** Array of tags to set on the friend account. */
        Tags: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetGameServerInstanceDataRequest */
    interface SetGameServerInstanceDataRequest {
        /** Unique identifier of the Game Instance to be updated, in decimal format. */
        LobbyId: string,
        /** Custom data to set for the specified game server instance. */
        GameServerData: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetGameServerInstanceDataResult */
    interface SetGameServerInstanceDataResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetGameServerInstanceStateRequest */
    interface SetGameServerInstanceStateRequest {
        /** Unique identifier of the Game Instance to be updated, in decimal format. */
        LobbyId: string,
        /** State to set for the specified game server instance. */
        State: GameInstanceState,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetGameServerInstanceStateResult */
    interface SetGameServerInstanceStateResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetGameServerInstanceTagsRequest */
    interface SetGameServerInstanceTagsRequest {
        /** Unique identifier of the Game Server Instance to be updated. */
        LobbyId: string,
        /** 
         * Tags to set for the specified Game Server Instance. Note that this is the
         * complete list of tags to be associated with the Game Server Instance.
         */
        Tags: { [key: string]: string },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetGameServerInstanceTagsResult */
    interface SetGameServerInstanceTagsResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetPublisherDataRequest */
    interface SetPublisherDataRequest {
        /** 
         * key we want to set a value on (note, this is additive - will only replace an
         * existing key's value if they are the same name.) Keys are trimmed of
         * whitespace. Keys may not begin with the '!' character.
         */
        Key: string,
        /** new value to set. Set to null to remove a value */
        Value?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetPublisherDataResult */
    interface SetPublisherDataResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetTitleDataRequest */
    interface SetTitleDataRequest {
        /** 
         * key we want to set a value on (note, this is additive - will only replace an
         * existing key's value if they are the same name.) Keys are trimmed of
         * whitespace. Keys may not begin with the '!' character.
         */
        Key: string,
        /** new value to set. Set to null to remove a value */
        Value?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SetTitleDataResult */
    interface SetTitleDataResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SharedGroupDataRecord */
    interface SharedGroupDataRecord {
        /** Data stored for the specified group data key. */
        Value?: string,
        /** PlayFabId of the user to last update this value. */
        LastUpdatedBy?: string,
        /** Timestamp for when this data was last updated. */
        LastUpdated: string,
        /** 
         * Indicates whether this data can be read by all users (public) or only members
         * of the group (private).
         */
        Permission?: UserDataPermission,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.StatisticModel */
    interface StatisticModel {
        /** Statistic name */
        Name?: string,
        /** Statistic version (0 if not a versioned statistic) */
        Version: number,
        /** Statistic value */
        Value: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.StatisticNameVersion */
    interface StatisticNameVersion {
        /** unique name of the statistic */
        StatisticName: string,
        /** the version of the statistic to be returned */
        Version: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.StatisticUpdate */
    interface StatisticUpdate {
        /** unique name of the statistic */
        StatisticName: string,
        /** 
         * for updates to an existing statistic value for a player, the version of the
         * statistic when it was loaded. Null when setting the statistic value for the
         * first time.
         */
        Version?: number,
        /** statistic value for the player */
        Value: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.StatisticValue */
    interface StatisticValue {
        /** unique name of the statistic */
        StatisticName?: string,
        /** statistic value for the player */
        Value: number,
        /** 
         * for updates to an existing statistic value for a player, the version of the
         * statistic when it was loaded
         */
        Version: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SteamPlayFabIdPair */
    interface SteamPlayFabIdPair {
        /** Unique Steam identifier for a user. */
        SteamStringId?: string,
        /** 
         * Unique PlayFab identifier for a user, or null if no PlayFab account is linked
         * to the Steam identifier.
         */
        PlayFabId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SubtractCharacterVirtualCurrencyRequest */
    interface SubtractCharacterVirtualCurrencyRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Name of the virtual currency which is to be decremented. */
        VirtualCurrency: string,
        /** Amount to be subtracted from the user balance of the specified virtual currency. */
        Amount: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.SubtractUserVirtualCurrencyRequest */
    interface SubtractUserVirtualCurrencyRequest {
        /** 
         * PlayFab unique identifier of the user whose virtual currency balance is to be
         * decreased.
         */
        PlayFabId: string,
        /** Name of the virtual currency which is to be decremented. */
        VirtualCurrency: string,
        /** Amount to be subtracted from the user balance of the specified virtual currency. */
        Amount: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.TagModel */
    interface TagModel {
        /** Full value of the tag, including namespace */
        TagValue?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.TaskInstanceStatus */
    type TaskInstanceStatus = "Succeeded"
        | "Starting"
        | "InProgress"
        | "Failed"
        | "Aborted"
        | "Pending";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.TitleActivationStatus */
    type TitleActivationStatus = "None"
        | "ActivatedTitleKey"
        | "PendingSteam"
        | "ActivatedSteam"
        | "RevokedSteam";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.TitleNewsItem */
    interface TitleNewsItem {
        /** Date and time when the news items was posted. */
        Timestamp: string,
        /** Unique identifier of news item. */
        NewsId?: string,
        /** Title of the news item. */
        Title?: string,
        /** News item text. */
        Body?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UnlockContainerInstanceRequest */
    interface UnlockContainerInstanceRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId?: string,
        /** ItemInstanceId of the container to unlock. */
        ContainerItemInstanceId: string,
        /** 
         * ItemInstanceId of the key that will be consumed by unlocking this container.
         * If the container requires a key, this parameter is required.
         */
        KeyItemInstanceId?: string,
        /** 
         * Specifies the catalog version that should be used to determine container
         * contents.  If unspecified, uses catalog associated with the item instance.
         */
        CatalogVersion?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UnlockContainerItemRequest */
    interface UnlockContainerItemRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId?: string,
        /** Catalog ItemId of the container type to unlock. */
        ContainerItemId: string,
        /** 
         * Specifies the catalog version that should be used to determine container
         * contents.  If unspecified, uses default/primary catalog.
         */
        CatalogVersion?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UnlockContainerItemResult */
    interface UnlockContainerItemResult {
        /** Unique instance identifier of the container unlocked. */
        UnlockedItemInstanceId?: string,
        /** 
         * Unique instance identifier of the key used to unlock the container, if
         * applicable.
         */
        UnlockedWithItemInstanceId?: string,
        /** Items granted to the player as a result of unlocking the container. */
        GrantedItems?: ItemInstance[],
        /** Virtual currency granted to the player as a result of unlocking the container. */
        VirtualCurrency?: { [key: string]: number },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateAvatarUrlRequest */
    interface UpdateAvatarUrlRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** URL of the avatar image. If empty, it removes the existing avatar URL. */
        ImageUrl: string,
    }

    /** 
     * Represents a single update ban request.
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateBanRequest
     */
    interface UpdateBanRequest {
        /** The id of the ban to be updated. */
        BanId: string,
        /** 
         * The updated reason for the ban to be updated. Maximum 140 characters. Null for
         * no change.
         */
        Reason?: string,
        /** The updated expiration date for the ban. Null for no change. */
        Expires?: string,
        /** The updated IP address for the ban. Null for no change. */
        IPAddress?: string,
        /** The updated MAC address for the ban. Null for no change. */
        MACAddress?: string,
        /** 
         * Whether to make this ban permanent. Set to true to make this ban permanent.
         * This will not modify Active state.
         */
        Permanent?: boolean,
        /** The updated active state for the ban. Null for no change. */
        Active?: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateBansRequest */
    interface UpdateBansRequest {
        /** List of bans to be updated. Maximum 100. */
        Bans: UpdateBanRequest[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateBansResult */
    interface UpdateBansResult {
        /** Information on the bans that were updated */
        BanData?: BanInfo[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateCharacterDataRequest */
    interface UpdateCharacterDataRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** 
         * Key-value pairs to be written to the custom data. Note that keys are trimmed of
         * whitespace, are limited in size, and may not begin with a '!' character.
         */
        Data?: { [key: string]: string },
        /** 
         * Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert
         * null-values into Data due to language constraints.  Use this to delete the
         * keys directly.
         */
        KeysToRemove?: string[],
        /** 
         * Permission to be applied to all user data keys written in this request.
         * Defaults to "private" if not set.
         */
        Permission?: UserDataPermission,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateCharacterDataResult */
    interface UpdateCharacterDataResult {
        /** 
         * Indicates the current version of the data that has been set. This is
         * incremented with every set call for that type of data (read-only, internal,
         * etc). This version can be provided in Get calls to find updated data.
         */
        DataVersion: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateCharacterStatisticsRequest */
    interface UpdateCharacterStatisticsRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** Statistics to be updated with the provided values. */
        CharacterStatistics?: { [key: string]: number },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateCharacterStatisticsResult */
    interface UpdateCharacterStatisticsResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdatePlayerStatisticsRequest */
    interface UpdatePlayerStatisticsRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Statistics to be updated with the provided values */
        Statistics: StatisticUpdate[],
        /** 
         * Indicates whether the statistics provided should be set, regardless of the
         * aggregation method set on the statistic. Default is false.
         */
        ForceUpdate?: boolean,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdatePlayerStatisticsResult */
    interface UpdatePlayerStatisticsResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateSharedGroupDataRequest */
    interface UpdateSharedGroupDataRequest {
        /** Unique identifier for the shared group. */
        SharedGroupId: string,
        /** 
         * Key-value pairs to be written to the custom data. Note that keys are trimmed of
         * whitespace, are limited in size, and may not begin with a '!' character.
         */
        Data?: { [key: string]: string },
        /** 
         * Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert
         * null-values into Data due to language constraints.  Use this to delete the
         * keys directly.
         */
        KeysToRemove?: string[],
        /** Permission to be applied to all user data keys in this request. */
        Permission?: UserDataPermission,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateSharedGroupDataResult */
    interface UpdateSharedGroupDataResult {
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateUserDataRequest */
    interface UpdateUserDataRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** 
         * Key-value pairs to be written to the custom data. Note that keys are trimmed of
         * whitespace, are limited in size, and may not begin with a '!' character.
         */
        Data?: { [key: string]: string },
        /** 
         * Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert
         * null-values into Data due to language constraints.  Use this to delete the
         * keys directly.
         */
        KeysToRemove?: string[],
        /** 
         * Permission to be applied to all user data keys written in this request.
         * Defaults to "private" if not set.
         */
        Permission?: UserDataPermission,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateUserDataResult */
    interface UpdateUserDataResult {
        /** 
         * Indicates the current version of the data that has been set. This is
         * incremented with every set call for that type of data (read-only, internal,
         * etc). This version can be provided in Get calls to find updated data.
         */
        DataVersion: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateUserInternalDataRequest */
    interface UpdateUserInternalDataRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** 
         * Key-value pairs to be written to the custom data. Note that keys are trimmed of
         * whitespace, are limited in size, and may not begin with a '!' character.
         */
        Data?: { [key: string]: string },
        /** 
         * Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert
         * null-values into Data due to language constraints.  Use this to delete the
         * keys directly.
         */
        KeysToRemove?: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UpdateUserInventoryItemDataRequest */
    interface UpdateUserInventoryItemDataRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId?: string,
        /** Unique PlayFab assigned instance identifier of the item */
        ItemInstanceId: string,
        /** 
         * Key-value pairs to be written to the custom data. Note that keys are trimmed of
         * whitespace, are limited in size, and may not begin with a '!' character.
         */
        Data?: { [key: string]: string },
        /** 
         * Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert
         * null-values into Data due to language constraints.  Use this to delete the
         * keys directly.
         */
        KeysToRemove?: string[],
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserAccountInfo */
    interface UserAccountInfo {
        /** Unique identifier for the user account */
        PlayFabId?: string,
        /** Timestamp indicating when the user account was created */
        Created: string,
        /** User account name in the PlayFab service */
        Username?: string,
        /** Title-specific information for the user account */
        TitleInfo?: UserTitleInfo,
        /** Personal information for the user which is considered more sensitive */
        PrivateInfo?: UserPrivateAccountInfo,
        /** User Facebook information, if a Facebook account has been linked */
        FacebookInfo?: UserFacebookInfo,
        /** User Steam information, if a Steam account has been linked */
        SteamInfo?: UserSteamInfo,
        /** User Gamecenter information, if a Gamecenter account has been linked */
        GameCenterInfo?: UserGameCenterInfo,
        /** User iOS device information, if an iOS device has been linked */
        IosDeviceInfo?: UserIosDeviceInfo,
        /** User Android device information, if an Android device has been linked */
        AndroidDeviceInfo?: UserAndroidDeviceInfo,
        /** User Kongregate account information, if a Kongregate account has been linked */
        KongregateInfo?: UserKongregateInfo,
        /** User Twitch account information, if a Twitch account has been linked */
        TwitchInfo?: UserTwitchInfo,
        /** User PSN account information, if a PSN account has been linked */
        PsnInfo?: UserPsnInfo,
        /** User Google account information, if a Google account has been linked */
        GoogleInfo?: UserGoogleInfo,
        /** User XBox account information, if a XBox account has been linked */
        XboxInfo?: UserXboxInfo,
        /** Custom ID information, if a custom ID has been assigned */
        CustomIdInfo?: UserCustomIdInfo,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserAndroidDeviceInfo */
    interface UserAndroidDeviceInfo {
        /** Android device ID */
        AndroidDeviceId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserCustomIdInfo */
    interface UserCustomIdInfo {
        /** Custom ID */
        CustomId?: string,
    }

    /** 
     * Indicates whether a given data key is private (readable only by the player) or
     * public (readable by all players). When a player makes a GetUserData request
     * about another player, only keys marked Public will be returned.
     * https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserDataPermission
     */
    type UserDataPermission = "Private"
        | "Public";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserDataRecord */
    interface UserDataRecord {
        /** Data stored for the specified user data key. */
        Value?: string,
        /** Timestamp for when this data was last updated. */
        LastUpdated: string,
        /** 
         * Indicates whether this data can be read by all users (public) or only the user
         * (private). This is used for GetUserData requests being made by one player
         * about another player.
         */
        Permission?: UserDataPermission,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserFacebookInfo */
    interface UserFacebookInfo {
        /** Facebook identifier */
        FacebookId?: string,
        /** Facebook full name */
        FullName?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserGameCenterInfo */
    interface UserGameCenterInfo {
        /** Gamecenter identifier */
        GameCenterId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserGoogleInfo */
    interface UserGoogleInfo {
        /** Google ID */
        GoogleId?: string,
        /** Email address of the Google account */
        GoogleEmail?: string,
        /** Locale of the Google account */
        GoogleLocale?: string,
        /** Gender information of the Google account */
        GoogleGender?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserIosDeviceInfo */
    interface UserIosDeviceInfo {
        /** iOS device ID */
        IosDeviceId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserKongregateInfo */
    interface UserKongregateInfo {
        /** Kongregate ID */
        KongregateId?: string,
        /** Kongregate Username */
        KongregateName?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserOrigination */
    type UserOrigination = "Organic"
        | "Steam"
        | "Google"
        | "Amazon"
        | "Facebook"
        | "Kongregate"
        | "GamersFirst"
        | "Unknown"
        | "IOS"
        | "LoadTest"
        | "Android"
        | "PSN"
        | "GameCenter"
        | "CustomId"
        | "XboxLive"
        | "Parse"
        | "Twitch"
        | "WindowsHello";

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserPrivateAccountInfo */
    interface UserPrivateAccountInfo {
        /** user email address */
        Email?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserPsnInfo */
    interface UserPsnInfo {
        /** PSN account ID */
        PsnAccountId?: string,
        /** PSN online ID */
        PsnOnlineId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserSteamInfo */
    interface UserSteamInfo {
        /** Steam identifier */
        SteamId?: string,
        /** the country in which the player resides, from Steam data */
        SteamCountry?: string,
        /** currency type set in the user Steam account */
        SteamCurrency?: Currency,
        /** what stage of game ownership the user is listed as being in, from Steam */
        SteamActivationStatus?: TitleActivationStatus,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserTitleInfo */
    interface UserTitleInfo {
        /** name of the user, as it is displayed in-game */
        DisplayName?: string,
        /** source by which the user first joined the game, if known */
        Origination?: UserOrigination,
        /** 
         * timestamp indicating when the user was first associated with this game (this
         * can differ significantly from when the user first registered with PlayFab)
         */
        Created: string,
        /** timestamp for the last user login for this title */
        LastLogin?: string,
        /** 
         * timestamp indicating when the user first signed into this game (this can differ
         * from the Created timestamp, as other events, such as issuing a beta key to the
         * user, can associate the title to the user)
         */
        FirstLogin?: string,
        /** boolean indicating whether or not the user is currently banned for a title */
        isBanned?: boolean,
        /** URL to the player's avatar. */
        AvatarUrl?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserTwitchInfo */
    interface UserTwitchInfo {
        /** Twitch ID */
        TwitchId?: string,
        /** Twitch Username */
        TwitchUserName?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.UserXboxInfo */
    interface UserXboxInfo {
        /** XBox user ID */
        XboxUserId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.ValueToDateModel */
    interface ValueToDateModel {
        /** ISO 4217 code of the currency used in the purchases */
        Currency?: string,
        /** 
         * Total value of the purchases in a whole number of 1/100 monetary units. For
         * example 999 indicates nine dollars and ninety-nine cents when Currency is
         * 'USD')
         */
        TotalValue: number,
        /** 
         * Total value of the purchases in a string representation of decimal monetary
         * units (e.g. '9.99' indicates nine dollars and ninety-nine cents when Currency
         * is 'USD'))
         */
        TotalValueAsDecimal?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.VirtualCurrencyBalanceModel */
    interface VirtualCurrencyBalanceModel {
        /** Name of the virtual currency */
        Currency?: string,
        /** Balance of the virtual currency */
        TotalValue: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.VirtualCurrencyRechargeTime */
    interface VirtualCurrencyRechargeTime {
        /** 
         * Time remaining (in seconds) before the next recharge increment of the virtual
         * currency.
         */
        SecondsToRecharge: number,
        /** 
         * Server timestamp in UTC indicating the next time the virtual currency will be
         * incremented.
         */
        RechargeTime: string,
        /** 
         * Maximum value to which the regenerating currency will automatically increment.
         * Note that it can exceed this value through use of the AddUserVirtualCurrency
         * API call. However, it will not regenerate automatically until it has fallen
         * below this value.
         */
        RechargeMax: number,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.WriteEventResponse */
    interface WriteEventResponse {
        /** 
         * The unique identifier of the event. The values of this identifier consist of
         * ASCII characters and are not constrained to any particular format.
         */
        EventId?: string,
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.WriteServerCharacterEventRequest */
    interface WriteServerCharacterEventRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** Unique PlayFab assigned ID for a specific character owned by a user */
        CharacterId: string,
        /** 
         * The name of the event, within the namespace scoped to the title. The naming
         * convention is up to the caller, but it commonly follows the
         * subject_verb_object pattern (e.g. player_logged_in).
         */
        EventName: string,
        /** 
         * The time (in UTC) associated with this event. The value dafaults to the current
         * time.
         */
        Timestamp?: string,
        /** 
         * Custom event properties. Each property consists of a name (string) and a value
         * (JSON object).
         */
        Body?: { [key: string]: any },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.WriteServerPlayerEventRequest */
    interface WriteServerPlayerEventRequest {
        /** Unique PlayFab assigned ID of the user on whom the operation will be performed. */
        PlayFabId: string,
        /** 
         * The name of the event, within the namespace scoped to the title. The naming
         * convention is up to the caller, but it commonly follows the
         * subject_verb_object pattern (e.g. player_logged_in).
         */
        EventName: string,
        /** 
         * The time (in UTC) associated with this event. The value dafaults to the current
         * time.
         */
        Timestamp?: string,
        /** 
         * Custom data properties associated with the event. Each property consists of a
         * name (string) and a value (JSON object).
         */
        Body?: { [key: string]: any },
    }

    /** https://api.playfab.com/Documentation/Server/datatype/PlayFab.Server.Models/PlayFab.Server.Models.WriteTitleEventRequest */
    interface WriteTitleEventRequest {
        /** 
         * The name of the event, within the namespace scoped to the title. The naming
         * convention is up to the caller, but it commonly follows the
         * subject_verb_object pattern (e.g. player_logged_in).
         */
        EventName: string,
        /** 
         * The time (in UTC) associated with this event. The value dafaults to the current
         * time.
         */
        Timestamp?: string,
        /** 
         * Custom event properties. Each property consists of a name (string) and a value
         * (JSON object).
         */
        Body?: { [key: string]: any },
    }

}

interface IPlayFabServerAPI {
    /** 
     * Validated a client's session ticket, and if successful, returns details for
     * that user
     * https://api.playfab.com/Documentation/Server/method/AuthenticateSessionTicket
     */
    AuthenticateSessionTicket(request: PlayFabServerModels.AuthenticateSessionTicketRequest): PlayFabServerModels.AuthenticateSessionTicketResult;

    /** 
     * Bans users by PlayFab ID with optional IP address, or MAC address for the
     * provided game.
     * https://api.playfab.com/Documentation/Server/method/BanUsers
     */
    BanUsers(request: PlayFabServerModels.BanUsersRequest): PlayFabServerModels.BanUsersResult;

    /** 
     * Retrieves the unique PlayFab identifiers for the given set of Facebook
     * identifiers.
     * https://api.playfab.com/Documentation/Server/method/GetPlayFabIDsFromFacebookIDs
     */
    GetPlayFabIDsFromFacebookIDs(request: PlayFabServerModels.GetPlayFabIDsFromFacebookIDsRequest): PlayFabServerModels.GetPlayFabIDsFromFacebookIDsResult;

    /** 
     * Retrieves the unique PlayFab identifiers for the given set of Steam
     * identifiers. The Steam identifiers  are the profile IDs for the user accounts,
     * available as SteamId in the Steamworks Community API calls.
     * https://api.playfab.com/Documentation/Server/method/GetPlayFabIDsFromSteamIDs
     */
    GetPlayFabIDsFromSteamIDs(request: PlayFabServerModels.GetPlayFabIDsFromSteamIDsRequest): PlayFabServerModels.GetPlayFabIDsFromSteamIDsResult;

    /** 
     * Retrieves the relevant details for a specified user
     * https://api.playfab.com/Documentation/Server/method/GetUserAccountInfo
     */
    GetUserAccountInfo(request: PlayFabServerModels.GetUserAccountInfoRequest): PlayFabServerModels.GetUserAccountInfoResult;

    /** 
     * Gets all bans for a user.
     * https://api.playfab.com/Documentation/Server/method/GetUserBans
     */
    GetUserBans(request: PlayFabServerModels.GetUserBansRequest): PlayFabServerModels.GetUserBansResult;

    /** 
     * Revoke all active bans for a user.
     * https://api.playfab.com/Documentation/Server/method/RevokeAllBansForUser
     */
    RevokeAllBansForUser(request: PlayFabServerModels.RevokeAllBansForUserRequest): PlayFabServerModels.RevokeAllBansForUserResult;

    /** 
     * Revoke all active bans specified with BanId.
     * https://api.playfab.com/Documentation/Server/method/RevokeBans
     */
    RevokeBans(request: PlayFabServerModels.RevokeBansRequest): PlayFabServerModels.RevokeBansResult;

    /** 
     * Sends an iOS/Android Push Notification to a specific user, if that user's
     * device has been configured for Push Notifications in PlayFab. If a user has
     * linked both Android and iOS devices, both will be notified.
     * https://api.playfab.com/Documentation/Server/method/SendPushNotification
     */
    SendPushNotification(request: PlayFabServerModels.SendPushNotificationRequest): PlayFabServerModels.SendPushNotificationResult;

    /** 
     * Update the avatar URL of the specified player
     * https://api.playfab.com/Documentation/Server/method/UpdateAvatarUrl
     */
    UpdateAvatarUrl(request: PlayFabServerModels.UpdateAvatarUrlRequest): PlayFabServerModels.EmptyResult;

    /** 
     * Updates information of a list of existing bans specified with Ban Ids.
     * https://api.playfab.com/Documentation/Server/method/UpdateBans
     */
    UpdateBans(request: PlayFabServerModels.UpdateBansRequest): PlayFabServerModels.UpdateBansResult;

    /** 
     * Deletes the users for the provided game. Deletes custom data, all account
     * linkages, and statistics.
     * https://api.playfab.com/Documentation/Server/method/DeleteUsers
     */
    DeleteUsers(request: PlayFabServerModels.DeleteUsersRequest): PlayFabServerModels.DeleteUsersResult;

    /** 
     * Retrieves a list of ranked friends of the given player for the given statistic,
     * starting from the indicated point in the leaderboard
     * https://api.playfab.com/Documentation/Server/method/GetFriendLeaderboard
     */
    GetFriendLeaderboard(request: PlayFabServerModels.GetFriendLeaderboardRequest): PlayFabServerModels.GetLeaderboardResult;

    /** 
     * Retrieves a list of ranked users for the given statistic, starting from the
     * indicated point in the leaderboard
     * https://api.playfab.com/Documentation/Server/method/GetLeaderboard
     */
    GetLeaderboard(request: PlayFabServerModels.GetLeaderboardRequest): PlayFabServerModels.GetLeaderboardResult;

    /** 
     * Retrieves a list of ranked users for the given statistic, centered on the
     * currently signed-in user
     * https://api.playfab.com/Documentation/Server/method/GetLeaderboardAroundUser
     */
    GetLeaderboardAroundUser(request: PlayFabServerModels.GetLeaderboardAroundUserRequest): PlayFabServerModels.GetLeaderboardAroundUserResult;

    /** 
     * Returns whatever info is requested in the response for the user. Note that PII
     * (like email address, facebook id)             may be returned. All parameters
     * default to false.
     * https://api.playfab.com/Documentation/Server/method/GetPlayerCombinedInfo
     */
    GetPlayerCombinedInfo(request: PlayFabServerModels.GetPlayerCombinedInfoRequest): PlayFabServerModels.GetPlayerCombinedInfoResult;

    /** 
     * Retrieves the current version and values for the indicated statistics, for the
     * local player.
     * https://api.playfab.com/Documentation/Server/method/GetPlayerStatistics
     */
    GetPlayerStatistics(request: PlayFabServerModels.GetPlayerStatisticsRequest): PlayFabServerModels.GetPlayerStatisticsResult;

    /** 
     * Retrieves the information on the available versions of the specified statistic.
     * https://api.playfab.com/Documentation/Server/method/GetPlayerStatisticVersions
     */
    GetPlayerStatisticVersions(request: PlayFabServerModels.GetPlayerStatisticVersionsRequest): PlayFabServerModels.GetPlayerStatisticVersionsResult;

    /** 
     * Retrieves the title-specific custom data for the user which is readable and
     * writable by the client
     * https://api.playfab.com/Documentation/Server/method/GetUserData
     */
    GetUserData(request: PlayFabServerModels.GetUserDataRequest): PlayFabServerModels.GetUserDataResult;

    /** 
     * Retrieves the title-specific custom data for the user which cannot be accessed
     * by the client
     * https://api.playfab.com/Documentation/Server/method/GetUserInternalData
     */
    GetUserInternalData(request: PlayFabServerModels.GetUserDataRequest): PlayFabServerModels.GetUserDataResult;

    /** 
     * Retrieves the publisher-specific custom data for the user which is readable and
     * writable by the client
     * https://api.playfab.com/Documentation/Server/method/GetUserPublisherData
     */
    GetUserPublisherData(request: PlayFabServerModels.GetUserDataRequest): PlayFabServerModels.GetUserDataResult;

    /** 
     * Retrieves the publisher-specific custom data for the user which cannot be
     * accessed by the client
     * https://api.playfab.com/Documentation/Server/method/GetUserPublisherInternalData
     */
    GetUserPublisherInternalData(request: PlayFabServerModels.GetUserDataRequest): PlayFabServerModels.GetUserDataResult;

    /** 
     * Retrieves the publisher-specific custom data for the user which can only be
     * read by the client
     * https://api.playfab.com/Documentation/Server/method/GetUserPublisherReadOnlyData
     */
    GetUserPublisherReadOnlyData(request: PlayFabServerModels.GetUserDataRequest): PlayFabServerModels.GetUserDataResult;

    /** 
     * Retrieves the title-specific custom data for the user which can only be read by
     * the client
     * https://api.playfab.com/Documentation/Server/method/GetUserReadOnlyData
     */
    GetUserReadOnlyData(request: PlayFabServerModels.GetUserDataRequest): PlayFabServerModels.GetUserDataResult;

    /** 
     * Updates the values of the specified title-specific statistics for the user
     * https://api.playfab.com/Documentation/Server/method/UpdatePlayerStatistics
     */
    UpdatePlayerStatistics(request: PlayFabServerModels.UpdatePlayerStatisticsRequest): PlayFabServerModels.UpdatePlayerStatisticsResult;

    /** 
     * Updates the title-specific custom data for the user which is readable and
     * writable by the client
     * https://api.playfab.com/Documentation/Server/method/UpdateUserData
     */
    UpdateUserData(request: PlayFabServerModels.UpdateUserDataRequest): PlayFabServerModels.UpdateUserDataResult;

    /** 
     * Updates the title-specific custom data for the user which cannot be accessed by
     * the client
     * https://api.playfab.com/Documentation/Server/method/UpdateUserInternalData
     */
    UpdateUserInternalData(request: PlayFabServerModels.UpdateUserInternalDataRequest): PlayFabServerModels.UpdateUserDataResult;

    /** 
     * Updates the publisher-specific custom data for the user which is readable and
     * writable by the client
     * https://api.playfab.com/Documentation/Server/method/UpdateUserPublisherData
     */
    UpdateUserPublisherData(request: PlayFabServerModels.UpdateUserDataRequest): PlayFabServerModels.UpdateUserDataResult;

    /** 
     * Updates the publisher-specific custom data for the user which cannot be
     * accessed by the client
     * https://api.playfab.com/Documentation/Server/method/UpdateUserPublisherInternalData
     */
    UpdateUserPublisherInternalData(request: PlayFabServerModels.UpdateUserInternalDataRequest): PlayFabServerModels.UpdateUserDataResult;

    /** 
     * Updates the publisher-specific custom data for the user which can only be read
     * by the client
     * https://api.playfab.com/Documentation/Server/method/UpdateUserPublisherReadOnlyData
     */
    UpdateUserPublisherReadOnlyData(request: PlayFabServerModels.UpdateUserDataRequest): PlayFabServerModels.UpdateUserDataResult;

    /** 
     * Updates the title-specific custom data for the user which can only be read by
     * the client
     * https://api.playfab.com/Documentation/Server/method/UpdateUserReadOnlyData
     */
    UpdateUserReadOnlyData(request: PlayFabServerModels.UpdateUserDataRequest): PlayFabServerModels.UpdateUserDataResult;

    /** 
     * Retrieves the specified version of the title's catalog of virtual goods,
     * including all defined properties
     * https://api.playfab.com/Documentation/Server/method/GetCatalogItems
     */
    GetCatalogItems(request: PlayFabServerModels.GetCatalogItemsRequest): PlayFabServerModels.GetCatalogItemsResult;

    /** 
     * Retrieves the key-value store of custom publisher settings
     * https://api.playfab.com/Documentation/Server/method/GetPublisherData
     */
    GetPublisherData(request: PlayFabServerModels.GetPublisherDataRequest): PlayFabServerModels.GetPublisherDataResult;

    /** 
     * Retrieves the current server time
     * https://api.playfab.com/Documentation/Server/method/GetTime
     */
    GetTime(request: PlayFabServerModels.GetTimeRequest): PlayFabServerModels.GetTimeResult;

    /** 
     * Retrieves the key-value store of custom title settings
     * https://api.playfab.com/Documentation/Server/method/GetTitleData
     */
    GetTitleData(request: PlayFabServerModels.GetTitleDataRequest): PlayFabServerModels.GetTitleDataResult;

    /** 
     * Retrieves the key-value store of custom internal title settings
     * https://api.playfab.com/Documentation/Server/method/GetTitleInternalData
     */
    GetTitleInternalData(request: PlayFabServerModels.GetTitleDataRequest): PlayFabServerModels.GetTitleDataResult;

    /** 
     * Retrieves the title news feed, as configured in the developer portal
     * https://api.playfab.com/Documentation/Server/method/GetTitleNews
     */
    GetTitleNews(request: PlayFabServerModels.GetTitleNewsRequest): PlayFabServerModels.GetTitleNewsResult;

    /** 
     * Updates the key-value store of custom publisher settings
     * https://api.playfab.com/Documentation/Server/method/SetPublisherData
     */
    SetPublisherData(request: PlayFabServerModels.SetPublisherDataRequest): PlayFabServerModels.SetPublisherDataResult;

    /** 
     * Updates the key-value store of custom title settings
     * https://api.playfab.com/Documentation/Server/method/SetTitleData
     */
    SetTitleData(request: PlayFabServerModels.SetTitleDataRequest): PlayFabServerModels.SetTitleDataResult;

    /** 
     * Updates the key-value store of custom title settings
     * https://api.playfab.com/Documentation/Server/method/SetTitleInternalData
     */
    SetTitleInternalData(request: PlayFabServerModels.SetTitleDataRequest): PlayFabServerModels.SetTitleDataResult;

    /** 
     * Increments  the character's balance of the specified virtual currency by the
     * stated amount
     * https://api.playfab.com/Documentation/Server/method/AddCharacterVirtualCurrency
     */
    AddCharacterVirtualCurrency(request: PlayFabServerModels.AddCharacterVirtualCurrencyRequest): PlayFabServerModels.ModifyCharacterVirtualCurrencyResult;

    /** 
     * Increments  the user's balance of the specified virtual currency by the stated
     * amount
     * https://api.playfab.com/Documentation/Server/method/AddUserVirtualCurrency
     */
    AddUserVirtualCurrency(request: PlayFabServerModels.AddUserVirtualCurrencyRequest): PlayFabServerModels.ModifyUserVirtualCurrencyResult;

    /** 
     * Consume uses of a consumable item. When all uses are consumed, it will be
     * removed from the player's inventory.
     * https://api.playfab.com/Documentation/Server/method/ConsumeItem
     */
    ConsumeItem(request: PlayFabServerModels.ConsumeItemRequest): PlayFabServerModels.ConsumeItemResult;

    /** 
     * Returns the result of an evaluation of a Random Result Table - the ItemId from
     * the game Catalog which would have been added to the player inventory, if the
     * Random Result Table were added via a Bundle or a call to UnlockContainer.
     * https://api.playfab.com/Documentation/Server/method/EvaluateRandomResultTable
     */
    EvaluateRandomResultTable(request: PlayFabServerModels.EvaluateRandomResultTableRequest): PlayFabServerModels.EvaluateRandomResultTableResult;

    /** 
     * Retrieves the specified character's current inventory of virtual goods
     * https://api.playfab.com/Documentation/Server/method/GetCharacterInventory
     */
    GetCharacterInventory(request: PlayFabServerModels.GetCharacterInventoryRequest): PlayFabServerModels.GetCharacterInventoryResult;

    /** 
     * Retrieves the configuration information for the specified random results tables
     * for the title, including all ItemId values and weights
     * https://api.playfab.com/Documentation/Server/method/GetRandomResultTables
     */
    GetRandomResultTables(request: PlayFabServerModels.GetRandomResultTablesRequest): PlayFabServerModels.GetRandomResultTablesResult;

    /** 
     * Retrieves the specified user's current inventory of virtual goods
     * https://api.playfab.com/Documentation/Server/method/GetUserInventory
     */
    GetUserInventory(request: PlayFabServerModels.GetUserInventoryRequest): PlayFabServerModels.GetUserInventoryResult;

    /** 
     * Adds the specified items to the specified character's inventory
     * https://api.playfab.com/Documentation/Server/method/GrantItemsToCharacter
     */
    GrantItemsToCharacter(request: PlayFabServerModels.GrantItemsToCharacterRequest): PlayFabServerModels.GrantItemsToCharacterResult;

    /** 
     * Adds the specified items to the specified user's inventory
     * https://api.playfab.com/Documentation/Server/method/GrantItemsToUser
     */
    GrantItemsToUser(request: PlayFabServerModels.GrantItemsToUserRequest): PlayFabServerModels.GrantItemsToUserResult;

    /** 
     * Adds the specified items to the specified user inventories
     * https://api.playfab.com/Documentation/Server/method/GrantItemsToUsers
     */
    GrantItemsToUsers(request: PlayFabServerModels.GrantItemsToUsersRequest): PlayFabServerModels.GrantItemsToUsersResult;

    /** 
     * Modifies the number of remaining uses of a player's inventory item
     * https://api.playfab.com/Documentation/Server/method/ModifyItemUses
     */
    ModifyItemUses(request: PlayFabServerModels.ModifyItemUsesRequest): PlayFabServerModels.ModifyItemUsesResult;

    /** 
     * Moves an item from a character's inventory into another of the users's
     * character's inventory.
     * https://api.playfab.com/Documentation/Server/method/MoveItemToCharacterFromCharacter
     */
    MoveItemToCharacterFromCharacter(request: PlayFabServerModels.MoveItemToCharacterFromCharacterRequest): PlayFabServerModels.MoveItemToCharacterFromCharacterResult;

    /** 
     * Moves an item from a user's inventory into their character's inventory.
     * https://api.playfab.com/Documentation/Server/method/MoveItemToCharacterFromUser
     */
    MoveItemToCharacterFromUser(request: PlayFabServerModels.MoveItemToCharacterFromUserRequest): PlayFabServerModels.MoveItemToCharacterFromUserResult;

    /** 
     * Moves an item from a character's inventory into the owning user's inventory.
     * https://api.playfab.com/Documentation/Server/method/MoveItemToUserFromCharacter
     */
    MoveItemToUserFromCharacter(request: PlayFabServerModels.MoveItemToUserFromCharacterRequest): PlayFabServerModels.MoveItemToUserFromCharacterResult;

    /** 
     * Adds the virtual goods associated with the coupon to the user's inventory.
     * Coupons can be generated  via the Economy->Catalogs tab in the PlayFab Game
     * Manager.
     * https://api.playfab.com/Documentation/Server/method/RedeemCoupon
     */
    RedeemCoupon(request: PlayFabServerModels.RedeemCouponRequest): PlayFabServerModels.RedeemCouponResult;

    /** 
     * Submit a report about a player (due to bad bahavior, etc.) on behalf of another
     * player, so that customer service representatives for the title can take action
     * concerning potentially toxic players.
     * https://api.playfab.com/Documentation/Server/method/ReportPlayer
     */
    ReportPlayer(request: PlayFabServerModels.ReportPlayerServerRequest): PlayFabServerModels.ReportPlayerServerResult;

    /** 
     * Revokes access to an item in a user's inventory
     * https://api.playfab.com/Documentation/Server/method/RevokeInventoryItem
     */
    RevokeInventoryItem(request: PlayFabServerModels.RevokeInventoryItemRequest): PlayFabServerModels.RevokeInventoryResult;

    /** 
     * Decrements the character's balance of the specified virtual currency by the
     * stated amount
     * https://api.playfab.com/Documentation/Server/method/SubtractCharacterVirtualCurrency
     */
    SubtractCharacterVirtualCurrency(request: PlayFabServerModels.SubtractCharacterVirtualCurrencyRequest): PlayFabServerModels.ModifyCharacterVirtualCurrencyResult;

    /** 
     * Decrements the user's balance of the specified virtual currency by the stated
     * amount
     * https://api.playfab.com/Documentation/Server/method/SubtractUserVirtualCurrency
     */
    SubtractUserVirtualCurrency(request: PlayFabServerModels.SubtractUserVirtualCurrencyRequest): PlayFabServerModels.ModifyUserVirtualCurrencyResult;

    /** 
     * Opens a specific container (ContainerItemInstanceId), with a specific key
     * (KeyItemInstanceId, when required), and returns the contents of the opened
     * container. If the container (and key when relevant) are consumable
     * (RemainingUses > 0), their RemainingUses will be decremented, consistent with
     * the operation of ConsumeItem.
     * https://api.playfab.com/Documentation/Server/method/UnlockContainerInstance
     */
    UnlockContainerInstance(request: PlayFabServerModels.UnlockContainerInstanceRequest): PlayFabServerModels.UnlockContainerItemResult;

    /** 
     * Searches Player or Character inventory for any ItemInstance matching the given
     * CatalogItemId, if necessary unlocks it using any appropriate key, and returns
     * the contents of the opened container. If the container (and key when relevant)
     * are consumable (RemainingUses > 0), their RemainingUses will be decremented,
     * consistent with the operation of ConsumeItem.
     * https://api.playfab.com/Documentation/Server/method/UnlockContainerItem
     */
    UnlockContainerItem(request: PlayFabServerModels.UnlockContainerItemRequest): PlayFabServerModels.UnlockContainerItemResult;

    /** 
     * Updates the key-value pair data tagged to the specified item, which is
     * read-only from the client.
     * https://api.playfab.com/Documentation/Server/method/UpdateUserInventoryItemCustomData
     */
    UpdateUserInventoryItemCustomData(request: PlayFabServerModels.UpdateUserInventoryItemDataRequest): PlayFabServerModels.EmptyResult;

    /** 
     * Adds the Friend user to the friendlist of the user with PlayFabId. At least one
     * of FriendPlayFabId,FriendUsername,FriendEmail, or FriendTitleDisplayName
     * should be initialized.
     * https://api.playfab.com/Documentation/Server/method/AddFriend
     */
    AddFriend(request: PlayFabServerModels.AddFriendRequest): PlayFabServerModels.EmptyResult;

    /** 
     * Retrieves the current friends for the user with PlayFabId, constrained to users
     * who have PlayFab accounts. Friends from linked accounts (Facebook, Steam) are
     * also included. You may optionally exclude some linked services' friends.
     * https://api.playfab.com/Documentation/Server/method/GetFriendsList
     */
    GetFriendsList(request: PlayFabServerModels.GetFriendsListRequest): PlayFabServerModels.GetFriendsListResult;

    /** 
     * Removes the specified friend from the the user's friend list
     * https://api.playfab.com/Documentation/Server/method/RemoveFriend
     */
    RemoveFriend(request: PlayFabServerModels.RemoveFriendRequest): PlayFabServerModels.EmptyResult;

    /** 
     * Updates the tag list for a specified user in the friend list of another user
     * https://api.playfab.com/Documentation/Server/method/SetFriendTags
     */
    SetFriendTags(request: PlayFabServerModels.SetFriendTagsRequest): PlayFabServerModels.EmptyResult;

    /** 
     * Inform the matchmaker that a Game Server Instance is removed.
     * https://api.playfab.com/Documentation/Server/method/DeregisterGame
     */
    DeregisterGame(request: PlayFabServerModels.DeregisterGameRequest): PlayFabServerModels.DeregisterGameResponse;

    /** 
     * Informs the PlayFab match-making service that the user specified has left the
     * Game Server Instance
     * https://api.playfab.com/Documentation/Server/method/NotifyMatchmakerPlayerLeft
     */
    NotifyMatchmakerPlayerLeft(request: PlayFabServerModels.NotifyMatchmakerPlayerLeftRequest): PlayFabServerModels.NotifyMatchmakerPlayerLeftResult;

    /** 
     * Validates a Game Server session ticket and returns details about the user
     * https://api.playfab.com/Documentation/Server/method/RedeemMatchmakerTicket
     */
    RedeemMatchmakerTicket(request: PlayFabServerModels.RedeemMatchmakerTicketRequest): PlayFabServerModels.RedeemMatchmakerTicketResult;

    /** 
     * Set the state of the indicated Game Server Instance. Also update the heartbeat
     * for the instance.
     * https://api.playfab.com/Documentation/Server/method/RefreshGameServerInstanceHeartbeat
     */
    RefreshGameServerInstanceHeartbeat(request: PlayFabServerModels.RefreshGameServerInstanceHeartbeatRequest): PlayFabServerModels.RefreshGameServerInstanceHeartbeatResult;

    /** 
     * Inform the matchmaker that a new Game Server Instance is added.
     * https://api.playfab.com/Documentation/Server/method/RegisterGame
     */
    RegisterGame(request: PlayFabServerModels.RegisterGameRequest): PlayFabServerModels.RegisterGameResponse;

    /** 
     * Sets the custom data of the indicated Game Server Instance
     * https://api.playfab.com/Documentation/Server/method/SetGameServerInstanceData
     */
    SetGameServerInstanceData(request: PlayFabServerModels.SetGameServerInstanceDataRequest): PlayFabServerModels.SetGameServerInstanceDataResult;

    /** 
     * Set the state of the indicated Game Server Instance.
     * https://api.playfab.com/Documentation/Server/method/SetGameServerInstanceState
     */
    SetGameServerInstanceState(request: PlayFabServerModels.SetGameServerInstanceStateRequest): PlayFabServerModels.SetGameServerInstanceStateResult;

    /** 
     * Set custom tags for the specified Game Server Instance
     * https://api.playfab.com/Documentation/Server/method/SetGameServerInstanceTags
     */
    SetGameServerInstanceTags(request: PlayFabServerModels.SetGameServerInstanceTagsRequest): PlayFabServerModels.SetGameServerInstanceTagsResult;

    /** 
     * Awards the specified users the specified Steam achievements
     * https://api.playfab.com/Documentation/Server/method/AwardSteamAchievement
     */
    AwardSteamAchievement(request: PlayFabServerModels.AwardSteamAchievementRequest): PlayFabServerModels.AwardSteamAchievementResult;

    /** 
     * Writes a character-based event into PlayStream.
     * https://api.playfab.com/Documentation/Server/method/WriteCharacterEvent
     */
    WriteCharacterEvent(request: PlayFabServerModels.WriteServerCharacterEventRequest): PlayFabServerModels.WriteEventResponse;

    /** 
     * Writes a player-based event into PlayStream.
     * https://api.playfab.com/Documentation/Server/method/WritePlayerEvent
     */
    WritePlayerEvent(request: PlayFabServerModels.WriteServerPlayerEventRequest): PlayFabServerModels.WriteEventResponse;

    /** 
     * Writes a title-based event into PlayStream.
     * https://api.playfab.com/Documentation/Server/method/WriteTitleEvent
     */
    WriteTitleEvent(request: PlayFabServerModels.WriteTitleEventRequest): PlayFabServerModels.WriteEventResponse;

    /** 
     * Adds users to the set of those able to update both the shared data, as well as
     * the set of users in the group. Only users in the group (and the server) can
     * add new members.
     * https://api.playfab.com/Documentation/Server/method/AddSharedGroupMembers
     */
    AddSharedGroupMembers(request: PlayFabServerModels.AddSharedGroupMembersRequest): PlayFabServerModels.AddSharedGroupMembersResult;

    /** 
     * Requests the creation of a shared group object, containing key/value pairs
     * which may be updated by all members of the group. When created by a server,
     * the group will initially have no members.
     * https://api.playfab.com/Documentation/Server/method/CreateSharedGroup
     */
    CreateSharedGroup(request: PlayFabServerModels.CreateSharedGroupRequest): PlayFabServerModels.CreateSharedGroupResult;

    /** 
     * Deletes a shared group, freeing up the shared group ID to be reused for a new
     * group
     * https://api.playfab.com/Documentation/Server/method/DeleteSharedGroup
     */
    DeleteSharedGroup(request: PlayFabServerModels.DeleteSharedGroupRequest): PlayFabServerModels.EmptyResult;

    /** 
     * Retrieves data stored in a shared group object, as well as the list of members
     * in the group. The server can access all public and private group data.
     * https://api.playfab.com/Documentation/Server/method/GetSharedGroupData
     */
    GetSharedGroupData(request: PlayFabServerModels.GetSharedGroupDataRequest): PlayFabServerModels.GetSharedGroupDataResult;

    /** 
     * Removes users from the set of those able to update the shared data and the set
     * of users in the group. Only users in the group can remove members. If as a
     * result of the call, zero users remain with access, the group and its
     * associated data will be deleted.
     * https://api.playfab.com/Documentation/Server/method/RemoveSharedGroupMembers
     */
    RemoveSharedGroupMembers(request: PlayFabServerModels.RemoveSharedGroupMembersRequest): PlayFabServerModels.RemoveSharedGroupMembersResult;

    /** 
     * Adds, updates, and removes data keys for a shared group object. If the
     * permission is set to Public, all fields updated or added in this call will be
     * readable by users not in the group. By default, data permissions are set to
     * Private. Regardless of the permission setting, only members of the group (and
     * the server) can update the data.
     * https://api.playfab.com/Documentation/Server/method/UpdateSharedGroupData
     */
    UpdateSharedGroupData(request: PlayFabServerModels.UpdateSharedGroupDataRequest): PlayFabServerModels.UpdateSharedGroupDataResult;

    /** 
     * Executes a CloudScript function, with the 'currentPlayerId' variable set to the
     * specified PlayFabId parameter value.
     * https://api.playfab.com/Documentation/Server/method/ExecuteCloudScript
     */
    ExecuteCloudScript(request: PlayFabServerModels.ExecuteCloudScriptServerRequest): PlayFabServerModels.ExecuteCloudScriptResult;

    /** 
     * This API retrieves a pre-signed URL for accessing a content file for the title.
     * A subsequent  HTTP GET to the returned URL will attempt to download the
     * content. A HEAD query to the returned URL will attempt to  retrieve the
     * metadata of the content. Note that a successful result does not guarantee the
     * existence of this content -  if it has not been uploaded, the query to
     * retrieve the data will fail. See this post for more information:
     * https://community.playfab.com/hc/en-us/community/posts/205469488-How-to-upload-
     * files-to-PlayFab-s-Content-Service.  Also, please be aware that the Content
     * service is specifically PlayFab's CDN offering, for which standard CDN rates
     * apply.
     * https://api.playfab.com/Documentation/Server/method/GetContentDownloadUrl
     */
    GetContentDownloadUrl(request: PlayFabServerModels.GetContentDownloadUrlRequest): PlayFabServerModels.GetContentDownloadUrlResult;

    /** 
     * Deletes the specific character ID from the specified user.
     * https://api.playfab.com/Documentation/Server/method/DeleteCharacterFromUser
     */
    DeleteCharacterFromUser(request: PlayFabServerModels.DeleteCharacterFromUserRequest): PlayFabServerModels.DeleteCharacterFromUserResult;

    /** 
     * Lists all of the characters that belong to a specific user. CharacterIds are
     * not globally unique; characterId must be evaluated with the parent PlayFabId
     * to guarantee uniqueness.
     * https://api.playfab.com/Documentation/Server/method/GetAllUsersCharacters
     */
    GetAllUsersCharacters(request: PlayFabServerModels.ListUsersCharactersRequest): PlayFabServerModels.ListUsersCharactersResult;

    /** 
     * Retrieves a list of ranked characters for the given statistic, starting from
     * the indicated point in the leaderboard
     * https://api.playfab.com/Documentation/Server/method/GetCharacterLeaderboard
     */
    GetCharacterLeaderboard(request: PlayFabServerModels.GetCharacterLeaderboardRequest): PlayFabServerModels.GetCharacterLeaderboardResult;

    /** 
     * Retrieves the details of all title-specific statistics for the specific
     * character
     * https://api.playfab.com/Documentation/Server/method/GetCharacterStatistics
     */
    GetCharacterStatistics(request: PlayFabServerModels.GetCharacterStatisticsRequest): PlayFabServerModels.GetCharacterStatisticsResult;

    /** 
     * Retrieves a list of ranked characters for the given statistic, centered on the
     * requested user
     * https://api.playfab.com/Documentation/Server/method/GetLeaderboardAroundCharacter
     */
    GetLeaderboardAroundCharacter(request: PlayFabServerModels.GetLeaderboardAroundCharacterRequest): PlayFabServerModels.GetLeaderboardAroundCharacterResult;

    /** 
     * Retrieves a list of all of the user's characters for the given statistic.
     * https://api.playfab.com/Documentation/Server/method/GetLeaderboardForUserCharacters
     */
    GetLeaderboardForUserCharacters(request: PlayFabServerModels.GetLeaderboardForUsersCharactersRequest): PlayFabServerModels.GetLeaderboardForUsersCharactersResult;

    /** 
     * Grants the specified character type to the user. CharacterIds are not globally
     * unique; characterId must be evaluated with the parent PlayFabId to guarantee
     * uniqueness.
     * https://api.playfab.com/Documentation/Server/method/GrantCharacterToUser
     */
    GrantCharacterToUser(request: PlayFabServerModels.GrantCharacterToUserRequest): PlayFabServerModels.GrantCharacterToUserResult;

    /** 
     * Updates the values of the specified title-specific statistics for the specific
     * character
     * https://api.playfab.com/Documentation/Server/method/UpdateCharacterStatistics
     */
    UpdateCharacterStatistics(request: PlayFabServerModels.UpdateCharacterStatisticsRequest): PlayFabServerModels.UpdateCharacterStatisticsResult;

    /** 
     * Retrieves the title-specific custom data for the user which is readable and
     * writable by the client
     * https://api.playfab.com/Documentation/Server/method/GetCharacterData
     */
    GetCharacterData(request: PlayFabServerModels.GetCharacterDataRequest): PlayFabServerModels.GetCharacterDataResult;

    /** 
     * Retrieves the title-specific custom data for the user's character which cannot
     * be accessed by the client
     * https://api.playfab.com/Documentation/Server/method/GetCharacterInternalData
     */
    GetCharacterInternalData(request: PlayFabServerModels.GetCharacterDataRequest): PlayFabServerModels.GetCharacterDataResult;

    /** 
     * Retrieves the title-specific custom data for the user's character which can
     * only be read by the client
     * https://api.playfab.com/Documentation/Server/method/GetCharacterReadOnlyData
     */
    GetCharacterReadOnlyData(request: PlayFabServerModels.GetCharacterDataRequest): PlayFabServerModels.GetCharacterDataResult;

    /** 
     * Updates the title-specific custom data for the user's chjaracter which is
     * readable and writable by the client
     * https://api.playfab.com/Documentation/Server/method/UpdateCharacterData
     */
    UpdateCharacterData(request: PlayFabServerModels.UpdateCharacterDataRequest): PlayFabServerModels.UpdateCharacterDataResult;

    /** 
     * Updates the title-specific custom data for the user's character which cannot
     * be accessed by the client
     * https://api.playfab.com/Documentation/Server/method/UpdateCharacterInternalData
     */
    UpdateCharacterInternalData(request: PlayFabServerModels.UpdateCharacterDataRequest): PlayFabServerModels.UpdateCharacterDataResult;

    /** 
     * Updates the title-specific custom data for the user's character which can only
     * be read by the client
     * https://api.playfab.com/Documentation/Server/method/UpdateCharacterReadOnlyData
     */
    UpdateCharacterReadOnlyData(request: PlayFabServerModels.UpdateCharacterDataRequest): PlayFabServerModels.UpdateCharacterDataResult;

    /** 
     * Adds a given tag to a player profile. The tag's namespace is automatically
     * generated based on the source of the tag.
     * https://api.playfab.com/Documentation/Server/method/AddPlayerTag
     */
    AddPlayerTag(request: PlayFabServerModels.AddPlayerTagRequest): PlayFabServerModels.AddPlayerTagResult;

    /** 
     * Retrieve a list of all PlayStream actions groups.
     * https://api.playfab.com/Documentation/Server/method/GetAllActionGroups
     */
    GetAllActionGroups(request: PlayFabServerModels.GetAllActionGroupsRequest): PlayFabServerModels.GetAllActionGroupsResult;

    /** 
     * Retrieves an array of player segment definitions. Results from this can be used
     * in subsequent API calls such as GetPlayersInSegment which requires a Segment
     * ID. While segment names can change the ID for that segment will not change.
     * https://api.playfab.com/Documentation/Server/method/GetAllSegments
     */
    GetAllSegments(request: PlayFabServerModels.GetAllSegmentsRequest): PlayFabServerModels.GetAllSegmentsResult;

    /** 
     * List all segments that a player currently belongs to at this moment in time.
     * https://api.playfab.com/Documentation/Server/method/GetPlayerSegments
     */
    GetPlayerSegments(request: PlayFabServerModels.GetPlayersSegmentsRequest): PlayFabServerModels.GetPlayerSegmentsResult;

    /** 
     * Allows for paging through all players in a given segment. This API creates a
     * snapshot of all player profiles that match the segment definition at the time
     * of its creation and lives through the Total Seconds to Live, refreshing its
     * life span on each subsequent use of the Continuation Token. Profiles that
     * change during the course of paging will not be reflected in the results. AB
     * Test segments are currently not supported by this operation.
     * https://api.playfab.com/Documentation/Server/method/GetPlayersInSegment
     */
    GetPlayersInSegment(request: PlayFabServerModels.GetPlayersInSegmentRequest): PlayFabServerModels.GetPlayersInSegmentResult;

    /** 
     * Get all tags with a given Namespace (optional) from a player profile.
     * https://api.playfab.com/Documentation/Server/method/GetPlayerTags
     */
    GetPlayerTags(request: PlayFabServerModels.GetPlayerTagsRequest): PlayFabServerModels.GetPlayerTagsResult;

    /** 
     * Remove a given tag from a player profile. The tag's namespace is automatically
     * generated based on the source of the tag.
     * https://api.playfab.com/Documentation/Server/method/RemovePlayerTag
     */
    RemovePlayerTag(request: PlayFabServerModels.RemovePlayerTagRequest): PlayFabServerModels.RemovePlayerTagResult;


}
