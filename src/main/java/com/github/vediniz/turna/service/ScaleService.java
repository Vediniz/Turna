package com.github.vediniz.turna.service;

import com.github.vediniz.turna.DTO.ScheduleDay;
import com.github.vediniz.turna.entity.Scale;
import com.github.vediniz.turna.repository.ScaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScaleService {

    @Autowired
    private ScaleRepository scaleRepository;

    public List<ScheduleDay> generateMonthlySchedule(Long scaleId, int year, int month) {
        Scale scale = scaleRepository.findById(scaleId)
                .orElseThrow(() -> new RuntimeException("Scale not found: " + scaleId));

        List<ScheduleDay> monthlySchedule = new ArrayList<>();

        YearMonth targetMonth = YearMonth.of(year, month);
        LocalDate startDateOfMonth = targetMonth.atDay(1);
        LocalDate endDateOfMonth = targetMonth.atEndOfMonth();

        int workDays = scale.getWorkDays();
        int daysOff = scale.getDaysOff();
        int cycleLength = workDays + daysOff;
        LocalDate cycleStartDate = scale.getFirstWorkDay();

        for (LocalDate currentDate = startDateOfMonth; !currentDate.isAfter(endDateOfMonth); currentDate = currentDate.plusDays(1)) {

            long daysBetween = ChronoUnit.DAYS.between(cycleStartDate, currentDate);

            long daysIntoCycle = daysBetween % cycleLength;

            if (daysIntoCycle < 0) {
                daysIntoCycle += cycleLength;
            }

            String status;
            if (daysIntoCycle < workDays) {
                status = "Work";
            } else {
                status = "Off";
            }

            monthlySchedule.add(new ScheduleDay(currentDate, status));
        }

        return monthlySchedule;
    }

    public String create(Scale scale) {
        scaleRepository.save(scale);
        return "Scale created with ID: " + scale.getId();
    }

    public List<Scale> findAll() {
        return scaleRepository.findAll();
    }

    public String deleteById(Long id) {
        if (!scaleRepository.existsById(id)) {
            return "Scale not found with ID: " + id;
        }
        scaleRepository.deleteById(id);
        return "Scale deleted with ID: " + id;
    }


}