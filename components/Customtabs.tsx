import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import * as Icons from "phosphor-react-native";
import Diary from '@/app/(tabs)/Diary';
import Profile from '@/app/(tabs)/Profile';
import Dashboard from '@/app/(tabs)/Dashboard';
import Dtatistics from '@/app/(tabs)/Statistics';

export function Customtabs ({ state, descriptors, navigation }: BottomTabBarProps) {

      const tabbarIcons: any = {
        Diary: (isFocused: boolean) =>(
          <Icons.BookOpenIcon
            size={verticalScale(12.5)}
            weight={isFocused? "fill": "regular"}
            color={isFocused? "white": colors.subText}
            />
        ),
        Profile: (isFocused: boolean) =>(
          <Icons.User
            size={verticalScale(12.5)}
            weight={isFocused? "fill": "regular"}
            color={isFocused? "white": colors.subText}
            />
        ),
        Dashboard: (isFocused: boolean) =>(
          <Icons.SquaresFourIcon
            size={verticalScale(12.5)}
            weight={isFocused? "fill": "regular"}
            color={isFocused? "white": colors.subText}
            />
        ),
        Statistics: (isFocused: boolean) =>(
          <Icons.ChartBarIcon
            size={verticalScale(12.5)}
            weight={isFocused? "fill": "regular"}
            color={isFocused? "white": colors.subText}
            />
        ),
      }

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          // eslint-disable-next-line react/jsx-key
          <TouchableOpacity
            //href={buildHref(route.name, route.params)}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {
              tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar: {
        flexDirection: "row",
        width: "100%",
        height: Platform.OS == "ios" ? verticalScale(38): verticalScale(55),
        backgroundColor: colors.tabbar,
        justifyContent: "space-around",
        alignItems: "center",
        borderTopColor: colors.tabbar,
        borderTopWidth: 1,
        //paddingRight: 10
    },
    tabbarItem: {
      marginBottom: Platform.OS == "ios" ? spacingY._10 : spacingY._5,
      justifyContent: "center",
      alignItems: "center",
    }
})
