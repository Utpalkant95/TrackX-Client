const LayoutGridWrapper = ({ children, Cols = 3 } : { children: React.ReactNode , Cols?: number}) => {
  return (
    <div className={`grid gap-8 md:grid-cols-${Cols}`}>
      {children}
    </div>
  )
}

export default LayoutGridWrapper