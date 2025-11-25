import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex h-full items-center justify-center rounded-md bg-inherit">
                <AppLogoIcon className="block h-8 fill-current text-gray-800 dark:text-gray-200" />
            </div>
        </>
    );
}
