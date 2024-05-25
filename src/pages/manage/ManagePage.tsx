import { useState } from 'react'
import { TabButton } from '../../components/Buttons'
import { PiHardDrivesBold, PiMapPinBold, PiUserBold } from 'react-icons/pi'
import DestinationsTab from './DestinationsTab'
import BlogsTab from './BlogsTab'
import UsersTab from './UsersTab'

const ManagePage: React.FC = () => {
	const [tabIndex, setTabIndex] = useState(0)
	return (
		<div className="mx-auto flex min-h-screen justify-center gap-4 pb-6 pt-[72px] text-txtCol-1 xl:max-w-screen-xl">
			<div className="flex w-full items-start justify-center gap-4">
				<div className="flex w-[200px] flex-col gap-3">
					<TabButton
						index={0}
						tabIndex={tabIndex}
						onClick={() => setTabIndex(0)}
					>
						<PiMapPinBold className="text-xl" />
						Destinations
					</TabButton>
					<TabButton
						index={1}
						tabIndex={tabIndex}
						onClick={() => setTabIndex(1)}
					>
						<PiHardDrivesBold className="text-xl" />
						Blogs
					</TabButton>
					<TabButton
						index={2}
						tabIndex={tabIndex}
						onClick={() => setTabIndex(2)}
					>
						<PiUserBold className="text-xl" />
						Users
					</TabButton>
				</div>
				<div className="flex-1">
					{tabIndex === 0 && <DestinationsTab />}
					{tabIndex === 1 && <BlogsTab />}
					{tabIndex === 2 && <UsersTab />}
				</div>
			</div>
		</div>
	)
}

export default ManagePage
