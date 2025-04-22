import { Root } from "@react-three/uikit";
import { Defaults } from "@react-three/uikit-apfel";
import { Container, Text } from '@react-three/uikit'
import { Card } from "@react-three/uikit-apfel"
import { Button } from "@react-three/uikit-apfel"
import { ArrowLeft } from '@react-three/uikit-lucide'
import { useMemo } from 'react';

function PlanetInfoPanel() {
    return (
        <Container flexDirection="row">
            <Button variant="icon" size="xs">
                <ArrowLeft />
            </Button>
                <Card  flexDirection="column" borderRadius={12} padding={16} overflow="scroll">
                    <Container flexDirection="column" alignItems="flex-start" gapColumn={4}>
                        <Text fontSize={24}>Venus</Text>
                        <Text fontSize={18}>Taille</Text>
                        <Text fontSize={18}>Durée d'une journée</Text>
                        <Text fontSize={18}>Révolution autour du soleil</Text>
                        <Text fontSize={18}>Composition principale</Text>
                        <Text fontSize={18}>Température</Text>
                        <Container flexDirection="column">
                            <Text fontSize={12} opacity={0.7}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                            </Text>
                            <Text fontSize={12} opacity={0.7}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laoluptate velit esse cillum dolore
                            </Text>
                        </Container>
                    </Container>
                </Card>
        </Container>
    )
}

const UIPlanetInfo = () => {
    const panel = useMemo(() => <PlanetInfoPanel />, []);

    return (
        <Defaults>
            <Root sizeX={2} sizeY={2}>
                {panel}
            </Root>
        </Defaults>
    );
};

export default UIPlanetInfo;