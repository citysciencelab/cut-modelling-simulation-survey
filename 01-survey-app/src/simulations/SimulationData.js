import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import AirIcon from '@mui/icons-material/Air';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import DomainIcon from '@mui/icons-material/Domain';
import FloodIcon from '@mui/icons-material/Flood';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TrafficIcon from '@mui/icons-material/Traffic';

import LegendAQ from './air-quality/LegendAQ';
import LegendSH from './shadow/LegendSH';
import LegendWI from './wind/LegendWI';
import LegendRA from './rain/LegendRA';

export const Simulations = {
    "Umweltsimulationen": [
        {
            key: "air-quality",
            name: "Luftqualität",
            description: "Simulation der Luftqualität auf Grundlage der Sensordaten",
            preview: true,
            icon: <BlurCircularIcon />,
            legend: <LegendAQ/>

        },
        {
            key: "shadow",
            name: "Verschattung",
            description: "Simuliert die Verschattung zu verschiedenen Tageszeiten",
            preview: true,
            icon: <DomainIcon />,
            legend: <LegendSH/>
        },
        {
            key: "wind",
            name: "Windströmung",
            description: "Simulation der Windströmungen um das Modell",
            preview: true,
            icon: <AirIcon />,
            legend: <LegendWI/>
        },
        {
            key: "rain",
            name: "Starkregen",
            description: "Simulation von Überflutungen aufgrund von Starkregenereignissen",
            preview: true,
            icon: <FloodIcon />,
            legend: <LegendRA />
        },
        {
            key: "noise",
            name: "Lärm",
            description: "Lärmsimulation basierend auf dem Verkehrsmodell",
            preview: false,
            icon: <GraphicEqIcon />,
        },
        {
            key: "heat-islands",
            name: "Hitzeinseln",
            description: "Simulation von Hitzeinseln in der Stadt",
            preview: false,
            icon: <ThermostatIcon />,
        },
        {
            key: "ecologic-niche",
            name: "Ökologische Nischen",
            description: "Simuliert die Lebensräume für bestimmte Flora und Fauna",
            preview: false,
            icon: <EmojiNatureIcon />,
        }
    ],
    "Soziale Simulationen" : [
        {
            key: "evacuation",
            name: "Fluchtwege",
            description: "Simulation von Fluchtwegen und -zeiten an bestimmten Orten",
            preview: false,
            icon: <DirectionsRunIcon />,

        },
        {
            key: "accessibility",
            name: "Erreichbarkeit",
            description: "Simulation von Erreichbarkeiten",
            preview: false,
            icon: <WheelchairPickupIcon />,

        },

    ],
    "Technische Simulationen" : [
        {
            key: "traffic",
            name: "Verkehr",
            description: "Simulation der Verkehrsströme",
            preview: false,
            icon: <TrafficIcon />,

        }

    ]
}
