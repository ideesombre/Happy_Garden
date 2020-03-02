package diginamic.happygarden.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import diginamic.happygarden.model.Slot;
import diginamic.happygarden.repository.SlotRepository;

@Service
public class SlotService extends AbstractService<Slot, Long, SlotRepository> {
	
	@Autowired
	private SlotRepository slotRepository;

	public Long countSlots(Long id) {
		return slotRepository.countByPlantingAreaId(id);
	}

}
