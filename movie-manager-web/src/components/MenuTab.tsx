interface MenuTabProps {
  tabs: string[]
  activeTab: number
  onTabChange: (index: number) => void
}

export function MenuTab({ tabs, activeTab, onTabChange }: MenuTabProps) {
  return (
    <div
      className="flex gap-1 p-1 rounded-[10px] w-full"
      style={{ backgroundColor: '#131320' }}
    >
      {tabs.map((tab, index) => (
        <button
          key={index}
          className="flex justify-center items-center gap-2 px-3 py-2 flex-1 rounded-md text-base leading-[1.5] transition-all"
          onClick={() => onTabChange(index)}
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor: activeTab === index ? '#1a1b2d' : 'transparent',
            color: activeTab === index ? '#a85fdd' : '#7a7b9f',
          }}
          onMouseEnter={(e) => {
            if (activeTab !== index) {
              e.currentTarget.style.color = '#9d9eb9'
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== index) {
              e.currentTarget.style.color = '#7a7b9f'
            }
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
