import React, { useState } from 'react';

const message = ``;

const MyPopover = (props) => {

    return (
        <div style={{ position: 'absolute', border: "1px solid gray", padding: "8px" }}>
            <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "30em",
                height: "22em",
                marginTop: "-9em",
                marginLeft: "-15em",
                border: "1px solid #ccc",
                backgroundColor: "#f3f3f3",
                marginBottom: "20px",
                padding: "8px"
            }}>
                <div style={{ display: "flex", justifyContent: "flex-end"}}>
                    <button title={"Close"} onClick={() => props.setIsVisible(!props.isVisible)}>X</button>
                </div>                
                {props.isVisible && (
                    <div style={{ justifyContent: "left" }}>
                        <>
                            <h2 style={{ justifyContent: "left" }}>About Mobile</h2>
                            {<p>Discover the <b>{props.product.name}</b> 5G, which has a revolutionary 3D Curved pOLED 120 Hz Display protected
                                by Gorilla Glass 5 for remarkable longevity. With the 50 MP OIS Sony LYTIA 600 Camera system, you can take beautiful
                                pictures in any kind of illumination. Utilise Smart Connect to share content with ease and make use of the built-in
                                RAM <b>{props.product.ram}</b> and <b>{props.product.hhd}</b> storage. Immersive sound is produced by its Dolby Atmos Dual Stereo Speakers,
                                and its Snapdragon 6s Gen 3 engine guarantees lightning-fast 5G speeds over 13 bands. Android 14 delivers the newest
                                advancements in mobile technology and security, with a 5000 mAh battery and 33 W TurboPower charging.</p>}
                        </>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPopover;
