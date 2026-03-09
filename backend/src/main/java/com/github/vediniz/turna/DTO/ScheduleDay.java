package com.github.vediniz.turna.DTO;

import java.time.LocalDate;

public record ScheduleDay(
        LocalDate date,
        String status
) {}