import { useContext, useEffect, useRef, useState } from 'react'
import { PiInfo, PiPencilSimpleLineBold } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import { UserContext } from '../../context/UserContext'
import { uploadToCloudinary } from '../../utils/Cloundinary'
import { useToast } from '../../hook/useToast'

const MyAccount: React.FC<{ className?: string }> = ({ className }) => {
	const [imgHover, setImgHover] = useState(false)
	const imgRef = useRef<HTMLInputElement>(null)
	const { user, setUser } = useContext(UserContext)
	const [imgFile, setImgFile] = useState<File>()
	const toast = useToast()
	const handleChangeAvatar = async () => {
		if (!imgFile) return
		toast.info('Uploading', 'Please wait while we upload your avatar...')
		const avatar = await uploadToCloudinary(imgFile)
		toast.success('Success', 'Avatar updated successfully')
		setUser({ ...user, avatar })
	}
	useEffect(() => {
		handleChangeAvatar()
	}, [imgFile])

	return (
		<div className={twMerge('w-full px-8 py-5', className)}>
			<h3 className=" mb-4 text-2xl font-semibold">General Information</h3>
			<div className="flex items-center gap-2 text-txtCol-3">
				<PiInfo />
				<p className="text-sm">You can edit your personal information here.</p>
			</div>
			<div className="my-4 h-[1px] w-full bg-borderCol-1"></div>
			<div className="mt-1 flex w-full">
				<div>
					<h4 className="mb-3 text-[18px] font-semibold">Profile photo</h4>
					<div
						className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-full border border-borderCol-1"
						onMouseEnter={() => setImgHover(true)}
						onMouseLeave={() => setImgHover(false)}
						onClick={() => imgRef.current?.click()}
					>
						<input
							className="hidden"
							type="file"
							accept="image/*"
							onChange={(e) => {
								setImgFile(e.target.files?.[0])
							}}
							ref={imgRef}
						/>
						<img className="object-cover" src={user.avatar} alt="user-avatar" />
						<div
							className={`absolute left-0 top-0 flex h-full w-full translate-y-[-0.5px] items-center justify-center  bg-[#00000050] text-xl ${imgHover ? 'opacity-100' : 'opacity-0'}`}
						>
							<PiPencilSimpleLineBold className="text-white" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAccount
