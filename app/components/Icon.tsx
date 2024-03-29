import * as React from "react"
import { ComponentType, useMemo } from "react"
import {
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"
import { colors } from "app/theme"
// Icons
import Notification from "../../assets/svg/notification.svg"
import Eye from "../../assets/svg/eye.svg"
import Home from "../../assets/svg/home.svg"
import Card from "../../assets/svg/card.svg"
import Stats from "../../assets/svg/stats.svg"
import Pay from "../../assets/svg/pay.svg"

export enum IconTypes {
  Notification = "notification",
  Eye = "eye",
  Home = "home",
  Card = "card",
  Stats = "stats",
  Pay = "pay",
}

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color = colors.text,
    size = 20,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >

  const iconValueSVG = useMemo(() => {
    switch (icon) {
      case "notification":
        return <Notification width={size} height={size} fill={color} stroke={color} />
      case "eye":
        return <Eye width={size} height={size} fill={color} stroke={color} />
      case "home":
        return <Home width={size} height={size} fill={color} stroke={color} />
      case "card":
        return <Card width={size} height={size} fill={color} stroke={color} />
      case "stats":
        return <Stats width={size} height={size} fill={color} stroke={color} />
      case "pay":
        return <Pay width={size} height={size} fill={color} stroke={color} />
      default:
        return null
    }
  }, [icon, color, size])

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      {iconValueSVG}
    </Wrapper>
  )
}
