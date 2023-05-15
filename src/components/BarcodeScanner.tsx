import React, { useCallback, useEffect, useRef, useState } from 'react';
import Quagga from '@ericblade/quagga2';
import styles from "../styles/Home.module.css";
type BarcodeScannerProps = {
    onDetected: (code: string) => void;
};

const BarcodeScanner = ({ onDetected }: BarcodeScannerProps) => {
    const [scanning, setScanning] = useState(false);

    const scannerRef = useRef<HTMLDivElement>(null);

    const initScanner = useCallback(() => {
        void Quagga.init(
            {
                inputStream: {
                    name: 'Live',
                    type: 'LiveStream',
                    target: '#scanner',
                    constraints: {
                        width: 640,
                        height: 480,
                    }
                },
                locator: {
                    patchSize: 'large',
                    halfSample: true,
                },
                decoder: {
                    readers: ['ean_reader', 'ean_8_reader', 'code_39_reader'],
                },
                debug: false,
            },
            (error: any) => {
                if (error) {
                    console.error('Error initializing Quagga:', error);
                    return;
                }
                Quagga.start();
            }
        );
    }, []);

    const stopScanner = useCallback(() => {
        void Quagga.stop();
        if (scannerRef.current) {
            const videoElement = scannerRef.current.querySelector('video');
            if (videoElement) {
                scannerRef.current.removeChild(videoElement);
            }
            const canvasElement = scannerRef.current.querySelector('canvas');
            if (canvasElement) {
                scannerRef.current.removeChild(canvasElement);
            }
        }
    }, []);

    const onDetectedHandler = useCallback(
        (result: any) => {
            if (result && result.codeResult) {
                setScanning(false);
                onDetected(result.codeResult.code);
            }
        },
        [onDetected]
    );

    useEffect(() => {
        if (scanning) {
            initScanner();
            Quagga.onDetected(onDetectedHandler);
        } else {
            stopScanner();
            Quagga.offDetected(onDetectedHandler);
        }

        return () => {
            if (scanning) {
                stopScanner();
                Quagga.offDetected(onDetectedHandler);
            }
        };
    }, [initScanner, onDetectedHandler, scanning, stopScanner]);

    return (
        <div className={styles.barCodeContainer}>
            <h2>Barcode Scanner</h2>
            <div ref={scannerRef} id="scanner" style={{ marginTop: 16, width: 640, height: 480 }}></div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => setScanning(!scanning)}>{scanning ? 'Stop Scanner' : 'Start Scanner'}</button>
            </div>
        </div>
    );
};
export default BarcodeScanner;
