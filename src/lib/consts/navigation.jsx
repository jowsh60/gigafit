import {
	LuLayoutDashboard,
	LuCalendarRange,
	LuDumbbell,
	LuBeef,
	LuSettings,
	LuHelpCircle
} from 'react-icons/lu'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <LuLayoutDashboard />
	},
	{
		key: 'Day Logger',
		label: 'Day Logger',
		path: '/daylogger',
		icon: <LuCalendarRange />
	},
	{
		key: 'Add Workout',
		label: 'Add Workout',
		path: '/addworkout',
		icon: <LuDumbbell />
	},
	{
		key: 'Add Meal',
		label: 'Add Meal',
		path: '/addmeal',
		icon: <LuBeef />
	},
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <LuSettings />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <LuHelpCircle />
	}
]