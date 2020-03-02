package diginamic.happygarden.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import diginamic.happygarden.model.PlantingArea;

@Repository
public interface PlantingAreaRepository extends JpaRepository<PlantingArea, Long> {

	
	public long countGardenById(Long id);
	


	
	
}
