import React from "react"
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthenticator, View } from "@aws-amplify/ui-react";
import { useRouter, usePathname } from "next/navigation";


const BottomNavComponent: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { signOut } = useAuthenticator();

  const itemMap: Record<number, string> = {
    0: '/',
    1: '/log',
    2: '/smokes',
    3: '/settings'
  }

  // Automatically invert the key/value
  const pathMap = Object.fromEntries(
    Object.entries(itemMap).map(([key, value]) => [value, Number(key)])
  );

  const logoutValue = Object.entries(itemMap).length;

  const value = pathMap[pathname] ?? -1;

  return (<>
    <View style={{
      width: '100%',
      flexGrow: 0,
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          if (newValue === logoutValue) {
            signOut();
          } else {
            router.push(itemMap[newValue]);
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Log" icon={<DeviceThermostatIcon />} />
        <BottomNavigationAction label="Smokes" icon={<LocalFireDepartmentIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        <BottomNavigationAction label="Log Out" icon={<LogoutIcon />} />
      </BottomNavigation>
    </View>
  </>)
}
export default BottomNavComponent;