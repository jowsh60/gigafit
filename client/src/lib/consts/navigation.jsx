import { 
	IoGridOutline,
	IoCalendarOutline,
	IoBarbell,
	IoNutritionOutline,
	IoSettingsOutline,
	IoHelpCircleOutline
	} from "react-icons/io5";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <IoGridOutline />
	},
	{
		key: 'Day Logger',
		label: 'Day Logger',
		path: '/daylogger',
		icon: <IoCalendarOutline />
	},
	{
		key: 'Add Workout',
		label: 'Add Workout',
		path: '/addworkout',
		icon: <IoBarbell />
	},
	{
		key: 'Add Meal',
		label: 'Add Meal',
		path: '/addmeal',
		icon: <IoNutritionOutline />
	},
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <IoSettingsOutline />
	},
]