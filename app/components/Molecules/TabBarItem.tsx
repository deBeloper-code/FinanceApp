import { View, ViewStyle } from "react-native"
import React from "react"
import { Icon, IconTypes } from "../Icon"
import { colors, spacing } from "app/theme"

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
      <Icon
        icon={icon}
        color={focused ? colors.palette.iconColorPrimary : colors.palette.iconColorDefault}
        size={18}
      />
      {focused && <View style={$tabBarFocused} />}
    </View>
  )
}

const $containerTabBar: ViewStyle = {
  alignItems: "center",
  height: "100%",
}

const $tabBarFocused: ViewStyle = {
  width: 12,
  height: 4,
  backgroundColor: colors.palette.iconColorPrimary,
  borderRadius: 16,
  marginTop: spacing.xs,
}

export default TabBarItem
