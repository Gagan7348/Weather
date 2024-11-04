const Tooltip = ({ tooltipText, cName, styling }) => {
  return (
    <div className={cName} style={styling.div}>{tooltipText}</div>
  )
}

export default Tooltip