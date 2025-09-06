import { useState } from 'react'
import PageContainer from '../CustomUi/PageContainer'

const AddFacebookPixel = () => {
    const [FacebookPixel, setFacebookPixel] = useState({
        name: "",
        id: ""
    })
    return (
        <PageContainer
            titel={"add"}
            about={"Facebook Pixel"}
        ></PageContainer>
    )
}

export default AddFacebookPixel