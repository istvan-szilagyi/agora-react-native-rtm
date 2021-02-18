"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["OFF"] = 0] = "OFF";
    LogLevel[LogLevel["INFO"] = 15] = "INFO";
    LogLevel[LogLevel["WARNING"] = 14] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 12] = "ERROR";
    LogLevel[LogLevel["CRITICAL"] = 8] = "CRITICAL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const react_native_1 = require("react-native");
const { AgoraRTM } = react_native_1.NativeModules;
/**
 * `RtmEngine` is the entry point of the react native agora rtm sdk. You can call the {@link createClient} method of {@link RtmEngine} to create an `RtmEngine` instance.
 * @noInheritDoc
 */
class RtmEngine {
    // create RtmEngine instance
    constructor() {
        this.events = new react_native_1.NativeEventEmitter(AgoraRTM);
        this.internalEventSubscriptions = [];
    }
    /**
     * get the version of rtm sdk
     * @param callback (version) => {} required
     */
    getSdkVersion(callback) {
        AgoraRTM.getSdkVersion(callback);
    }
    /**
     * set sdk log file
     * @param path string: specified the generated log path
     * @param level {@link LogLevel}: sdk log level (0: "OFF", 0x0f: "INFO", 0x0e: "WARN", 0x0c: "ERROR", 0x08: "CRITICAL")
     * @param size number: file size in kbytes
     * Note File size settings of less than 512 KB or greater than 10 MB will not take effect.
     * @return Promise<any> This method will return {path: boolean, level: boolean, size: boolean}
     */
    setSdkLog(path, level, size) {
        return AgoraRTM.setSdkLog(path, level, size);
    }
    /**
     * supports platform: ios, android
     * @events {@link RtmEngineEvents}
     * @param evtName string required
     * @param callback (evt) => {} required
     */
    on(eventName, callback) {
        this.internalEventSubscriptions.push(this.events.addListener(`${RtmEngine.AG_RTMCHANNEL}${eventName}`, callback));
    }
    /**
     * supports platform: ios, android
     * This method creates AgoraRTM instance and begin event observing, collect all both remote and local invitations and channels resources.
     * method: createClient
     * @param appId String
     * @return void
     */
    createClient(appId) {
        if (RtmEngine.init === true)
            return;
        AgoraRTM.init(appId);
        RtmEngine.init = true;
        return;
    }
    // removeEvents
    removeEvents() {
        for (let i = this.internalEventSubscriptions.length; i >= 0; i--) {
            if (this.internalEventSubscriptions[i]) {
                this.internalEventSubscriptions[i].remove();
            }
            this.internalEventSubscriptions.splice(i, 1);
        }
    }
    /**
     * supports platform: ios, android
     * This method destroy AgoraRTM instance, stop event observing, release all both remote and local invitaitons and channels resources.
     * @param void
     * @return void
     */
    destroyClient() {
        if (RtmEngine.init === false)
            return;
        this.removeEvents();
        AgoraRTM.destroy();
        RtmEngine.init = false;
        return;
    }
    /**
     * supports platform: ios, android
     * This method do login with UserInfo
     * @param params {@link UserInfo}
     * ---
     * token | string | optional |
     * uid | string | required |
     * ---
     * @return Promise<any>
     */
    login(params) {
        return AgoraRTM.login(params);
    }
    /**
     * supports platform: ios, android
     * This method do logout.
     * @return Promise<any>
     */
    logout() {
        return AgoraRTM.logout();
    }
    /**
     * supports platform: ios, android
     * This method do renewToken when got `tokenExpired` event.
     * @param token String
     * @return Promise<any>
     */
    renewToken(token) {
        return AgoraRTM.renewToken(token);
    }
    /**
     * supports platform: ios, android
     * This method do send p2p message with {@link AgoraPeerMessage}
     * @param params AgoraPeerMessage
     * ---
     * peerId | string | required |
     * offline | boolean | requried |
     * text | string | required |
     * ---
     * @return Promise<any>
     */
    sendMessageToPeer(params) {
        return AgoraRTM.sendMessageToPeer(params);
    }
    /**
     * supports platform: ios, android
     * This method do join channel with channelId
     * @param channelId string
     * @return Promise<any>
     */
    joinChannel(channelId) {
        return AgoraRTM.joinChannel(channelId);
    }
    /**
     * supports platform: ios, android
     * This method do leave channel with channelId
     * @param channelId string
     * @return Promise<any>
     */
    leaveChannel(channelId) {
        return AgoraRTM.leaveChannel(channelId);
    }
    /**
     * supports platform: ios, android
     * This method enables you get members by channel id.
     * @param channelId string.
     * @return Promise<Members> {@link Members}}
     *
     * ---
     * members | {@link MemberInfo} |
     * ---
     *
     * MemberInfo
     * ---
     * uid | string | user id|
     * channelId | string | channel id|
     * ---
     */
    getChannelMembersBychannelId(channelId) {
        return AgoraRTM.getChannelMembersBychannelId(channelId);
    }
    /**
     * supports platform: ios, android
     * This method enables you get channel attributes by channel id.
     * @param channelId string.
     * @return Promise<Attributes>
     *
     * Attributes
     * ---
     * key | string | attribute name|
     * value | string | attribute value|
     * ---
     */
    getChannelAttributesByChannelId(channelId) {
     	return AgoraRTM.getChannelAttributesByChannelId(channelId);
    }
    /**
     * supports platform: ios, android
     * This method enables you add/update channel attribute by channel id.
     * @param channelId string.
     * @param attributeName string.
     * @param attributeValue string.
     * @return Promise
     */
    addOrUpdateChannelAttributeByChannelId(channelId, attributeName, attributeValue) {
        return AgoraRTM.addOrUpdateChannelAttributeByChannelId(channelId, attributeName, attributeValue);
    }
    /**
     * supports platform: ios, android
     * This method enables send message by channel id.
     * NOTICE: text bytelength has MAX_SIZE 32kb limit.
     * @param channelId string.
     * @param text string (bytesize shouldn't >= 32kb)
     * @param options message sending options
     * @return Promise<any>
     */
    sendMessageByChannelId(channelId, text, options) {
        return AgoraRTM.sendMessageByChannelId({ channelId, text, options });
    }
    /**
     * supports platform: ios, android
     * This method enables query peer online user by id array.
     * @param ids string array
     * @return Promise<ListPeerStatus> {@link ListPeerStatus}
     * ---
     * items | {@link MemberStatus} |
     * ---
     *
     * MemberStatus
     * ---
     * uid | string | user id|
     * online | boolean | online state|
     * ---
     */
    queryPeersOnlineStatus(ids) {
        return AgoraRTM.queryPeersOnlineStatus({ ids });
    }
    /**
     * supports platform: ios, android
     * This method enables set local user attributes with attributes {@link UserAttribute}
     * @param attributes {@link UserAttribute []}
     * @return Promise<any>
     *
     * UserAttribute
     * ---
     * key | string | required |
     * value | string | required |
     * ---
     */
    setLocalUserAttributes(attributes) {
        return AgoraRTM.setLocalUserAttributes({ attributes });
    }
    /**
     * supports platform: ios, android
     * This method enables you to replace attribute already exists or add attribute wasn't set for local user attributes;
     * @param attributes {@link UserAttribute []}
     * @return Promise<any>
     */
    replaceLocalUserAttributes(attributes) {
        return AgoraRTM.replaceLocalUserAttributes({ attributes });
    }
    /**
     * supports platform: ios, android
     * This method enables you to remove exists attribute for local user.
     * @param keys string []
     * @return Promise<any>
     */
    removeLocalUserAttributesByKeys(keys) {
        return AgoraRTM.removeLocalUserAttributesByKeys({ keys });
    }
    /**
     * supports platform: ios, android
     * This method enables you to remove all of local user attributes;
     * @param void
     * @return Promise<any>
     */
    removeAllLocalUserAttributes() {
        return AgoraRTM.removeAllLocalUserAttributes();
    }
    /**
     * supports platform: ios, android
     * This method enables you get user attributes by uid.
     * @param uid string. user id
     * @return Promise<UserProfile> {@link UserProfile}
     */
    getUserAttributesByUid(uid) {
        return AgoraRTM.getUserAttributesByUid(uid);
    }
    /**
     * supports platform: ios, android
     * This method enables send local invitation with invitationProps.
     * NOTICE: content bytelength has MAX_SIZE 32kb limit.
     * @param invitationProps {@link LocalInvitationProps}
     *
     * LocalInvitationProps
     * ---
     * uid | string | required |
     * channelId | string | required |
     * content | string | optional | 32kb limit |
     * ---
     *
     * @return Promise<any>
     */
    sendLocalInvitation(invitationProps) {
        return AgoraRTM.sendLocalInvitation(invitationProps);
    }
    /**
     * supports platform: ios, android
     * This method enables cancel local invitation with invitationProps.
     * NOTICE: content bytelength has MAX_SIZE 32kb limit.
     * @param invitationProps {@link LocalInvitationProps}
     *
     * LocalInvitationProps
     * ---
     * uid | string | required |
     * channelId | string | required |
     * content | string | optional | 32kb limit |
     * ---
     *
     * @return Promies<any>
     */
    cancelLocalInvitation(invitationProps) {
        return AgoraRTM.cancelLocalInvitation(invitationProps);
    }
    /**
     * supports platform: ios, android
     * This method enables accept remote invitation with RemoteInvitationProps.
     * NOTICE: content bytelength has MAX_SIZE 32kb limit.
     * @param invitationProps {@link RemoteInvitationProps}
     *
     * RemoteInvitationProps
     * ---
     * uid | string | required |
     * channelId | string | required |
     * response | string | optional | 32kb limit |
     * ---
     *
     * @return Promise<any>
     */
    acceptRemoteInvitation(remoteInvitationProps) {
        return AgoraRTM.sendRemoteInvitation(remoteInvitationProps);
    }
    /**
     * supports platform: ios, android
     * This method enables refuse remote invitation with RemoteInvitationProps.
     * NOTICE: content bytelength has MAX_SIZE 32kb limit.
     * @param invitationProps {@link RemoteInvitationProps}
     *
     * RemoteInvitationProps
     * ---
     * uid | string | required |
     * channelId | string | required |
     * response | string | optional | 32kb limit |
     * ---
     *
     * @return Promise<any>
     */
    refuseRemoteInvitation(remoteInvitationProps) {
        return AgoraRTM.refuseRemoteInvitation(remoteInvitationProps);
    }
}
exports.default = RtmEngine;
RtmEngine.init = false;
// sdk version
RtmEngine.version = "1.0.0-alpha.1";
// internal event identifiy for RtmEngine
RtmEngine.AG_RTMCHANNEL = "ag_rtm_";
//# sourceMappingURL=RtmEngine.js.map