package com.doran.doran.model.dto;

public class OrderItemDto extends ItemDto {
    private int optionId;
    private String optionName;
    private int optionQuantity;
    private int optionPrice;

    private int optionUnitPrice;

    private int shotQuantity;

    public int getShotQuantity() {
        return shotQuantity;
    }

    public void setShotQuantity(int shotQuantity) {
        this.shotQuantity = shotQuantity;
    }

    public int getOptionUnitPrice() {
        return optionUnitPrice;
    }

    public void setOptionUnitPrice(int optionUnitPrice) {
        this.optionUnitPrice = optionUnitPrice;
    }

    public int getOptionId() {
        return optionId;
    }

    public void setOptionId(int optionId) {
        this.optionId = optionId;
    }

    public String getOptionName() {
        return optionName;
    }

    public void setOptionName(String optionName) {
        this.optionName = optionName;
    }

    public int getOptionQuantity() {
        return optionQuantity;
    }

    public void setOptionQuantity(int optionQuantity) {
        this.optionQuantity = optionQuantity;
    }

    public int getOptionPrice() {
        return optionPrice;
    }

    public void setOptionPrice(int optionPrice) {
        this.optionPrice = optionPrice;
    }
}
