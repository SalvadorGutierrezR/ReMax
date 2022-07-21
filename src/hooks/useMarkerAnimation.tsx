import { useState, useEffect } from 'react';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTiming } from 'react-native-redash';

interface useMarkerAnimationProps {
    id: string;
    selectedMarker: string | null;
}

export const useMarkerAnimation = ({ id, selectedMarker }: useMarkerAnimationProps) => {

    const [active, setActive] = useState(0);

    useEffect(() => {
        const isActive = id === selectedMarker ? 1 : 0;
        setActive(isActive);
    }, [id, selectedMarker]);

    const transition = useTiming(active, {
        duration: 200,
    });

    const scale = interpolate(transition, [0, 1], [0, 1]);

    return scale;
}