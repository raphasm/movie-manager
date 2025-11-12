import { tv } from 'tailwind-variants'

interface MenuTabProps {
  tabs: string[]
  activeTab: number
  onTabChange: (index: number) => void
}

const tabButtonVariants = tv({
  base: 'flex justify-center items-center gap-2 px-3 py-2 flex-1 rounded-md text-base leading-[1.5] font-body transition-all',
  variants: {
    active: {
      true: 'bg-custom-bg-tab text-custom-purple-tab',
      false:
        'bg-transparent text-custom-text-gray hover:text-custom-text-gray-hover',
    },
  },
  defaultVariants: {
    active: false,
  },
})

export function MenuTab({ tabs, activeTab, onTabChange }: MenuTabProps) {
  return (
    <div className="flex gap-1 p-1 rounded-[10px] w-full bg-custom-bg-menu">
      {tabs.map((tab, index) => {
        const isActive = activeTab === index

        return (
          <button
            key={index}
            className={tabButtonVariants({ active: isActive })}
            onClick={() => onTabChange(index)}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}
