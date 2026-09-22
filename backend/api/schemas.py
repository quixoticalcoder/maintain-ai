from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    """Input schema for the /predict endpoint."""

    product_id: str = Field(..., description="Product ID (e.g. L47471)")
    type: str = Field(
        ..., description="Product quality type", pattern="^[LMH]$"
    )
    air_temperature: float = Field(
        ..., alias="Air temperature K", description="Air temperature in Kelvin"
    )
    process_temperature: float = Field(
        ...,
        alias="Process temperature K",
        description="Process temperature in Kelvin",
    )
    rotational_speed: int = Field(
        ..., alias="Rotational speed rpm", description="Rotational speed in RPM"
    )
    torque: float = Field(..., alias="Torque Nm", description="Torque in Nm")
    vibration_levels: float = Field(
        ..., alias="Vibration Levels", description="Vibration sensor reading"
    )
    operational_hours: float = Field(
        ..., alias="Operational Hours", description="Operational hours"
    )

    model_config = {"populate_by_name": True}


class PredictionResponse(BaseModel):
    """Output schema for the /predict endpoint."""

    prediction: str = Field(
        ..., description="Prediction label: 'Failure' or 'No Failure'"
    )
    confidence: float = Field(
        ..., description="Model confidence score (probability)"
    )
