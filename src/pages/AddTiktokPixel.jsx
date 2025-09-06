import React, { useState } from 'react'
import PageContainer from '../CustomUi/PageContainer'

const AddTiktokPixel = () => {
    const [TiktokPixel, setTiktokPixel] = useState({
        name: "",
        id: ""
    })
    return (
        <PageContainer
            titel={"add"}
            about={"Tiktok Pixel"}
        ></PageContainer>
    )
}

export default AddTiktokPixel