import {useFilePreviewQuery} from "../../services/api.js";

export default function FilePreview({uuid}){
    const {data: filePreview, isFetching} = useFilePreviewQuery({
        endpoint: `${uuid}`,
    });
    return(

        <>{filePreview?.data?.map((file, index) => (
            <div key={index}>
                <iframe
                    width="100%"
                    height="400px"
                    src={`https://docs.google.com/gview?embedded=true&url=${file?.attributes?.uri?.url}`}
                />
                <div className="gdoc-filename">{file?.attributes?.filename}</div>
            </div>
        ))}
        </>
    )
}