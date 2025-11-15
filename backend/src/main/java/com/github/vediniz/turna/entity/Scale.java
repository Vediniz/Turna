package com.github.vediniz.turna.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.temporal.TemporalAmount;

@Entity
@Table(name = "scale")
public class Scale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate firstWorkDay;
//    private LocalDate firstDayOff;
    private int workDays;
    private int daysOff;

    public Scale(LocalDate firstWorkDay, int workDays, int daysOff) {
        this.firstWorkDay = firstWorkDay;
//        this.firstDayOff = firstDayOff;
        this.workDays = workDays;
        this.daysOff = daysOff;
    }

    public Scale() {

    }

    public LocalDate getFirstWorkDay() {
        return firstWorkDay;
    }

    public void setFirstWorkDay(LocalDate firstWorkDay) {
        this.firstWorkDay = firstWorkDay;
    }

    public Long getId() {
        return id;
    }


    public int getWorkDays() {
        return workDays;
    }

    public void setWorkDays(int workDays) {
        this.workDays = workDays;
    }

    public int getDaysOff() {
        return daysOff;
    }

    public void setDaysOff(int daysOff) {
        this.daysOff = daysOff;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
