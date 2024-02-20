import React from "react"
import { Button, Tooltip } from "antd"

interface CustomBtnToolTipProps {
    title: string;
    loading: boolean;
    onClick: () => void;
    children: React.ReactNode;
    icon: React.ReactNode;
    background: string
}


const CustomBtnToolTip: React.FC<CustomBtnToolTipProps> = ({
    title,
    loading,
    onClick,
    children,
    icon,
    background
}) => {
    return (
        <Tooltip title={title}>
            <Button
                type="primary"
                icon={icon}
                loading={loading}
                onClick={onClick}
                style={{background: background}}
            >
                {children}
            </Button>
        </Tooltip>
    )

}

export default CustomBtnToolTip