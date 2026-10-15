import './AuthLayout.css';

export default function AuthLayout({ children }) {
    return (
        <div className='auth-page'>
            <div className='auth-container'>

                <div className='auth-image-section'>
                    <img 
                        src="/images/heroimg.png"
                        alt="Two women enjoying a shopping experience"
                    />

                    <div className='auth-image-overlay'>
                        <span className='auth-brand'>E-Sharp</span>
                        <h2>Shop what you love.</h2>
                        <p>Discover products you love and enjoy a simple shopping experience. </p>

                    </div>
                </div>

                <div className="auth-form-section">
                    {children}
                </div>
            </div>
        </div>
    );
}
