export default function MapComponent({ urlSuffix, zoom }) {
    const defaultLocation = 'Lesya Ukrainka Volyn National University';
    const mapSrc = urlSuffix
        ? `https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1s${urlSuffix}!5e$1!6i${zoom}!5m1!1sen`
        : `https://www.google.com/maps/embed?pb=!1m4!2m1!1s${defaultLocation}!5e$1!6i${zoom}!5m1!1sen`;

    return (
        <div>
            <iframe
                width="100%"
                height="100%"
                title="Map"
                style={{ border: 0 }}
                src={mapSrc}
            ></iframe>
        </div>
    );
}