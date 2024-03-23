import { View, ViewStyle, Image, ImageStyle } from "react-native"
import React from "react"
import { colors, spacing } from "app/theme"
import { Icon, Text } from "app/components"
import { ListItem } from "../ListItem"

type HeaderUserProps = {
  userName: string
  notification: number
}

const HeaderUser = (props: HeaderUserProps) => {
  const { userName, notification = 1 } = props
  return (
    <View style={$container}>
      {/* User image */}
      <View style={$containerImage}>
        <View style={$contentImage}>
          <Image style={$image} />
        </View>
      </View>
      {/* Info */}
      <View style={$info}>
        <Text preset="bold">Hi, Zen Al</Text>
        <Text>Wed, Feb 14, 2024</Text>
      </View>
      {/* Notification */}
      <View style={$notification}>
        <Icon icon={"bell"} />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  //   backgroundColor: "red",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xs,
  alignItems: "center",
  justifyContent: "space-between",
}

const $containerImage: ViewStyle = {
  width: "20%",
}
const $contentImage: ViewStyle = {
  backgroundColor: colors.palette.primaryPr02,
  width: 50,
  height: 50,
  borderRadius: 50,
}
const $image: ImageStyle = {
  marginBottom: spacing.xxl,
}

const $notification: ViewStyle = {
  width: "10%",
}
const $info: ViewStyle = {
  width: "70%",
}

export default HeaderUser
