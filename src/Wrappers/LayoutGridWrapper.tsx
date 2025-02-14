

const LayoutGridWrapper = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {children}
    </div>
  )
}

export default LayoutGridWrapper