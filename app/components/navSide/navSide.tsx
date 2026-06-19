export default function NavSide() {
	return (
		<>
			<div className='h-full w-full flex flex-col p-2'>
				<div className='header flex-row'>
					<div>
						<span>Reader</span>
					</div>
					<div>
						<div className='h-px w-2 bg-black'></div>
						<div className='h-px w-2 bg-black'></div>
					</div>
				</div>
				<div>Items</div>
			</div>
		</>
	)
}
