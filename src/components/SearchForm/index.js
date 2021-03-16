import React, { memo } from 'react'

const SearchForm = ({ handleChange, value }) => (
	<div className="form-div">
		<input placeholder="Search" style={{}} type="text" value={value} onChange={handleChange} />
	</div>
)

export default memo(SearchForm)
