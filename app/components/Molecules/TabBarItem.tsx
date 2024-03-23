import { View, ViewStyle } from "react-native"
import React from "react"
import { Icon, IconTypes } from "../Icon"
import { colors } from "app/theme"

interface TabBarItemProps {
  /**
   * The name of the icon
   */
  icon: IconTypes
  /**
   * The name of the icon
   */
  focused: boolean
}

const TabBarItem = (props: TabBarItemProps) => {
  // Props
  const { icon, focused } = props
  // Render:
  return (
    <View style={$containerTabBar}>
      <Icon icon={icon} color={focused ? colors.palette.iconColorPrimary : undefined} size={24} />
      {focused && <View style={$tabBarFocused} />}
    </View>
  )
}

const $containerTabBar: ViewStyle = {
  alignItems: "center",
  height: "100%",
}

const $tabBarFocused: ViewStyle = {
  width: 10,
  height: 5,
  backgroundColor: colors.palette.iconColorPrimary,
  borderRadius: 16,
}

export default TabBarItem
