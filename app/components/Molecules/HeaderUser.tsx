import { View, ViewStyle, Image, ImageStyle, ImageSourcePropType } from "react-native"
import React from "react"
import { colors, spacing } from "app/theme"
import { Icon, IconTypes, Text } from "app/components"

type HeaderUserProps = {
  userName: string
  notification: number
  image?: ImageSourcePropType
}

const HeaderUser = (props: HeaderUserProps) => {
  const { userName, notification, image } = props
  return (
    <View style={$container}>
      {/* User image */}
      <View style={$containerImage}>
        <View style={$contentImage}>
          <Image source={image} style={$image} />
        </View>
      </View>
      {/* Info */}
      <View style={$info}>
        <Text preset="bold">Hi, {userName}</Text>
        <Text>Wed, Feb 14, 2024</Text>
      </View>
      {/* Notification */}
      <View style={$notification}>
        <Icon icon={IconTypes.Notification} color={colors.text} />
        {notification > 0 && <View style={$notificationPending} />}
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.lg,
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: spacing.xs,
}

const $containerImage: ViewStyle = {
  width: "20%",
}
const $contentImage: ViewStyle = {
  backgroundColor: colors.palette.primaryPr02,
  width: 50,
  height: 50,
  borderRadius: 50,
  overflow: "hidden",
  justifyContent: "center",
  alignItems: "center",
}
const $image: ImageStyle = {
  marginTop: spacing.xs,
}

const $notification: ViewStyle = {
  width: "10%",
}
const $info: ViewStyle = {
  width: "70%",
}

const $notificationPending: ViewStyle = {
  width: 6,
  height: 6,
  backgroundColor: colors.error,
  borderRadius: 50,
  position: "absolute",
  right: 13,
}

export default HeaderUser
