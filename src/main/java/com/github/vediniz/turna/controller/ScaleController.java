package com.github.vediniz.turna.controller;

import com.github.vediniz.turna.DTO.ScheduleDay;
import com.github.vediniz.turna.entity.Scale;
import com.github.vediniz.turna.service.ScaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scales")
public class ScaleController {

    @Autowired
    private ScaleService scaleService;

    @GetMapping
    public List<Scale> findAll() {
        return scaleService.findAll();
    }

    @GetMapping("/{id}/schedule")
    public ResponseEntity<List<ScheduleDay>> getMonthlySchedule(
            @PathVariable("id") Long id,
            @RequestParam("year") int year,
            @RequestParam("month") int month) {

        List<ScheduleDay> schedule = scaleService.generateMonthlySchedule(id, year, month);

        return ResponseEntity.ok(schedule);
    }

    @PostMapping
    public ResponseEntity<String> createScale(@RequestBody Scale scale) {
        if (scale == null || scale.getWorkDays() <= 0 || scale.getDaysOff() <= 0) {
            return ResponseEntity.badRequest().body("Scale data is required");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(scaleService.create(scale));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteScaleById(@PathVariable("id") Long id) {
        scaleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}