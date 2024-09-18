export const Image = ({ src, alt="", align="right", width="100%" }) => {
    return (
        <p style={{
            textAlign: align
        }}><img style={{ maxWidth: width }} src={src} alt={alt} /></p>
    );
};